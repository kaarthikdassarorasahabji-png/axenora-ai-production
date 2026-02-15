import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Play, Pause, MoreHorizontal, Calendar } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';

export default function AdminServices() {
    const [activations, setActivations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Manual Activation State
    const [isActivateOpen, setIsActivateOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [serviceTier, setServiceTier] = useState('standard');
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [activating, setActivating] = useState(false);

    const { toast } = useToast();

    const fetchActivations = async () => {
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            
            if (!session?.access_token) {
                console.error('No session token found');
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/admin/services/activations`, {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setActivations(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch activations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivations();
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            if (!session?.access_token) return;

            const response = await fetch(`${API_BASE_URL}/api/admin/clients`, {
                headers: { 'Authorization': `Bearer ${session.access_token}` }
            });
            const data = await response.json();
            if (data.success) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleManualActivate = async () => {
        if (!selectedUser || !serviceName) {
            toast({ title: "Error", description: "Please select a user and enter service name", variant: "destructive" });
            return;
        }

        setActivating(true);
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            if (!session?.access_token) return;

            const response = await fetch(`${API_BASE_URL}/api/admin/services/activate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    userId: selectedUser,
                    serviceId: serviceName, // Using name as ID for now or need separate ID? Backend schema uses service_id text.
                    tier: serviceTier,
                    billingCycle
                })
            });

            const data = await response.json();
            if (data.success) {
                toast({ title: "Success", description: "Service activated successfully" });
                setIsActivateOpen(false);
                fetchActivations();
                // Reset form
                setServiceName('');
                setSelectedUser('');
            } else {
                toast({ title: "Error", description: data.message || "Failed to activate", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "Network error", variant: "destructive" });
        } finally {
            setActivating(false);
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            if (!session?.access_token) return;

            const response = await fetch(`${API_BASE_URL}/api/admin/services/${id}/activate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                toast({ title: "Status Updated", description: `Service ${newStatus === 'active' ? 'activated' : 'suspended'}` });
                fetchActivations();
            }
        } catch (error) {
            toast({ title: "Update Failed", description: "Could not update service status", variant: "destructive" });
        }
    };

    const filteredActivations = activations.filter((item: any) =>
        item.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.services?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Service Activations</h1>
                    <p className="text-muted-foreground">Manage active services for all clients.</p>
                </div>
                
                <Dialog open={isActivateOpen} onOpenChange={setIsActivateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Manually Activate Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Activate New Service</DialogTitle>
                            <DialogDescription>
                                Manually assign a service to a client.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="user" className="text-right">
                                    Client
                                </Label>
                                <Select value={selectedUser} onValueChange={setSelectedUser}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user: any) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="service" className="text-right">
                                    Service Name
                                </Label>
                                <Input
                                    id="service"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                    className="col-span-3"
                                    placeholder="e.g. Website Development"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="tier" className="text-right">
                                    Tier
                                </Label>
                                <Select value={serviceTier} onValueChange={setServiceTier}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select tier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard</SelectItem>
                                        <SelectItem value="pro">Pro</SelectItem>
                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cycle" className="text-right">
                                    Billing
                                </Label>
                                <Select value={billingCycle} onValueChange={setBillingCycle}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select cycle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                        <SelectItem value="one-time">One-Time</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleManualActivate} disabled={activating}>
                                {activating ? 'Activating...' : 'Activate Service'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-border/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search client or service..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                                <tr>
                                    <th className="p-4">Service</th>
                                    <th className="p-4">Client</th>
                                    <th className="p-4">Plan</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Activated</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-muted-foreground">Loading services...</td>
                                    </tr>
                                ) : filteredActivations.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-muted-foreground">No active services found.</td>
                                    </tr>
                                ) : (
                                    filteredActivations.map((item: any) => (
                                        <tr key={item.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                            <td className="p-4 font-medium">{item.services?.name || 'Unknown Service'}</td>
                                            <td className="p-4">
                                                <div className="font-medium">{item.profiles?.name || 'Guest'}</div>
                                                <div className="text-xs text-muted-foreground">{item.profiles?.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline">{item.service_tiers?.tier_name || 'Standard'}</Badge>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="secondary" className={item.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}>
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {item.activated_at ? new Date(item.activated_at).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Manage Access</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleToggleStatus(item.id, item.status)}>
                                                            {item.status === 'active' ? (
                                                                <>
                                                                    <Pause className="mr-2 h-4 w-4" /> Suspend Service
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Play className="mr-2 h-4 w-4" /> Activate Service
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Calendar className="mr-2 h-4 w-4" /> Extend Expiry
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
        </div>
    );
}
