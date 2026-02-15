import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal, Mail, Ban, CheckCircle } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminClients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();
    
    // View Profile State
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    
    // View Orders State
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const [clientOrders, setClientOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    const fetchClients = async () => {
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            if (!session?.access_token) return;

            const response = await fetch(`${API_BASE_URL}/api/admin/clients`, {
                headers: { 'Authorization': `Bearer ${session.access_token}` }
            });
            const data = await response.json();
            if (data.success) {
                setClients(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleSuspend = async (id: string, currentStatus: string) => {
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            if (!session?.access_token) return;

            // Optimistic update
            const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
            
            const response = await fetch(`${API_BASE_URL}/api/admin/clients/${id}/suspend`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                toast({ title: "Success", description: `User ${newStatus === 'suspended' ? 'suspended' : 'activated'}` });
                fetchClients();
            } else {
                 toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
            }
        } catch (error) {
             toast({ title: "Error", description: "Network error", variant: "destructive" });
        }
    };

    const handleViewProfile = (client: any) => {
        setSelectedClient(client);
        setIsViewOpen(true);
    };

    const handleViewOrders = async (client: any) => {
        setSelectedClient(client);
        setIsOrdersOpen(true);
        setOrdersLoading(true);
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            if (!session?.access_token) return;

            // Fetch all orders and filter (temporary solution, ideal is specific endpoint)
            const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
                 headers: { 'Authorization': `Bearer ${session.access_token}` }
            });
            const data = await response.json();
            if (data.success) {
                const userOrders = data.data.filter((order: any) => order.user_id === client.id);
                setClientOrders(userOrders);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast({ title: "Error", description: "Failed to load orders", variant: "destructive" });
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleExportCSV = () => {
        const headers = ['Client ID', 'Name', 'Email', 'Role', 'Status', 'Joined'];
        const rows = (filteredClients.length ? filteredClients : clients).map((client: any) => [
            client.id,
            client.name || 'Unknown',
            client.email,
            client.role,
            client.status || 'active',
            new Date(client.created_at).toLocaleDateString()
        ]);
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map((e: any) => e.join(','))].join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `clients_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredClients = clients.filter((client: any) =>
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                    <p className="text-muted-foreground">Manage your customer base and view their activity.</p>
                </div>
                <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Email All Clients
                </Button>
            </div>

            <Card className="border-border/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search clients..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleExportCSV}>
                                Export CSV
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="p-4">Client</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Joined</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">Loading clients...</td>
                                    </tr>
                                ) : filteredClients.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">No clients found matching your search.</td>
                                    </tr>
                                ) : (
                                    filteredClients.map((client: any) => (
                                        <tr key={client.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarImage src="" />
                                                        <AvatarFallback className="bg-primary/10 text-primary">{client.name?.charAt(0) || 'U'}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{client.name || 'Unknown'}</div>
                                                        <div className="text-xs text-muted-foreground">{client.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                                    Active
                                                </Badge>
                                            </td>
                                            <td className="p-4 capitalize">{client.role}</td>
                                            <td className="p-4 text-muted-foreground">
                                                {new Date(client.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleViewProfile(client)}>View Profile</DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleViewOrders(client)}>View Orders</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem 
                                                            className={client.status === 'suspended' ? "text-green-500" : "text-destructive"}
                                                            onClick={() => handleSuspend(client.id, client.status || 'active')}
                                                        >
                                                            {client.status === 'suspended' ? (
                                                                <>
                                                                    <CheckCircle className="mr-2 h-4 w-4" /> Activate Account
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Ban className="mr-2 h-4 w-4" /> Suspend Account
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Client Profile</DialogTitle>
                        <DialogDescription>Details for {selectedClient?.name}</DialogDescription>
                    </DialogHeader>
                    {selectedClient && (
                         <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarFallback className="text-lg">{selectedClient.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">{selectedClient.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                                    <Badge className="mt-1" variant={selectedClient.status === 'suspended' ? 'destructive' : 'default'}>
                                        {selectedClient.status || 'active'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Company</Label>
                                <span className="col-span-3 text-sm">{selectedClient.company || '-'}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Phone</Label>
                                <span className="col-span-3 text-sm">{selectedClient.phone || '-'}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Joined</Label>
                                <span className="col-span-3 text-sm">{new Date(selectedClient.created_at).toLocaleDateString()}</span>
                            </div>
                         </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Orders - {selectedClient?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[60vh] overflow-y-auto">
                        {ordersLoading ? (
                            <div className="p-4 text-center">Loading orders...</div>
                        ) : clientOrders.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground">No orders found for this client.</div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground font-medium border-b sticky top-0">
                                    <tr>
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Amount</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Payment</th>
                                        <th className="p-3">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientOrders.map((order: any) => (
                                        <tr key={order.id} className="border-b">
                                            <td className="p-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                                            <td className="p-3">₹{order.total_amount}</td>
                                            <td className="p-3">
                                                <Badge variant="outline">{order.status}</Badge>
                                            </td>
                                            <td className="p-3">
                                                <Badge variant="secondary" className={order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                                    {order.payment_status}
                                                </Badge>
                                            </td>
                                            <td className="p-3 text-muted-foreground">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
