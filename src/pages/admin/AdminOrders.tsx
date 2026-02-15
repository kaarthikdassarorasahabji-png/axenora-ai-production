import { useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MoreHorizontal, Eye, Truck, Check, X, Radio, Package, User, MapPin } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import { useRealtimeOrders } from '@/hooks/useRealtimeOrders';

export default function AdminOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();
    
    // Use real-time orders hook (admin view with notifications)
    const { orders, loading } = useRealtimeOrders({ showToasts: true });
    
    // View Details State
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleExportCSV = () => {
        const headers = ['Order ID', 'Customer Name', 'Email', 'Amount', 'Status', 'Payment', 'Date'];
        const rows = (filteredOrders.length ? filteredOrders : orders).map((order: any) => [
            order.order_number,
            order.profiles?.name || 'Guest',
            order.profiles?.email,
            order.total_amount,
            order.status,
            order.payment_status,
            new Date(order.created_at).toLocaleDateString()
        ]);
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
            
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewDetails = (order: any) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
            
            const response = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            
            if (response.ok) {
                toast({ title: "Order Updated", description: `Status changed to ${newStatus}` });
                // Real-time subscription will auto-update the UI
            }
        } catch (error) {
            toast({ title: "Update Failed", description: "Could not update order status", variant: "destructive" });
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            pending: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
            payment_confirmed: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
            processing: 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20',
            completed: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
            cancelled: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
            delivered: 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
        };
        return (
            <Badge variant="secondary" className={styles[status as keyof typeof styles] || 'bg-gray-500/10 text-gray-500'}>
                {status.replace('_', ' ')}
            </Badge>
        );
    };

    const filteredOrders = orders.filter((order: any) =>
        order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground">Manage and track customer orders.</p>
                </div>
                <Badge variant="outline" className="flex items-center gap-2 border-green-500 text-green-500">
                    <Radio className="h-3 w-3 animate-pulse" />
                    Live
                </Badge>
            </div>

            <Card className="border-border/50">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search order ID or email..."
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
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Payment</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-muted-foreground">Loading orders...</td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-muted-foreground">No orders found.</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order: any) => (
                                        <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                                            <td className="p-4 font-medium">{order.order_number}</td>
                                            <td className="p-4">
                                                <div className="font-medium">{order.profiles?.name || 'Guest'}</div>
                                                <div className="text-xs text-muted-foreground">{order.profiles?.email}</div>
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 font-medium">₹{order.total_amount.toLocaleString()}</td>
                                            <td className="p-4">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline" className={order.payment_status === 'paid' ? 'border-green-500 text-green-500' : 'border-yellow-500 text-yellow-500'}>
                                                    {order.payment_status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'confirmed')}>
                                                            <Check className="mr-2 h-4 w-4" /> Confirm Order
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'processing')}>
                                                            <Truck className="mr-2 h-4 w-4" /> Processing
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'shipped')}>
                                                            <Truck className="mr-2 h-4 w-4" /> Mark Shipped
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'out_for_delivery')}>
                                                            <Truck className="mr-2 h-4 w-4" /> Out for Delivery
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'delivered')}>
                                                            <Check className="mr-2 h-4 w-4 text-green-500" /> Mark Delivered
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'cancelled')} className="text-destructive">
                                                            <X className="mr-2 h-4 w-4" /> Cancel Order
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'refunded')} className="text-destructive">
                                                            <X className="mr-2 h-4 w-4" /> Mark Refunded
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                                                            <Eye className="mr-2 h-4 w-4" /> View Details
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

            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Order #{selectedOrder?.order_number}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <User className="h-4 w-4" /> Customer
                                    </h4>
                                    <p className="font-medium">{selectedOrder.profiles?.name || selectedOrder.billing_name || 'Guest'}</p>
                                    <p className="text-sm">{selectedOrder.profiles?.email || selectedOrder.billing_email}</p>
                                    <p className="text-sm">{selectedOrder.billing_phone}</p>
                                    {selectedOrder.order_notes?.includes('WhatsApp:') && (
                                        <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                                            {selectedOrder.order_notes}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Package className="h-4 w-4" /> Order Info
                                    </h4>
                                    <p className="text-sm">Date: {new Date(selectedOrder.created_at).toLocaleString()}</p>
                                    <div className="flex gap-2 mt-1">
                                        <StatusBadge status={selectedOrder.status} />
                                        <Badge variant="outline">{selectedOrder.payment_status}</Badge>
                                    </div>
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <MapPin className="h-4 w-4" /> Billing Address
                                </h4>
                                <p className="text-sm">
                                    {selectedOrder.billing_address}, {selectedOrder.billing_city}, {selectedOrder.billing_state}, {selectedOrder.billing_country}
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-sm font-medium mb-3">Order Items</h4>
                                <div className="border rounded-md">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="p-3 text-left">Service</th>
                                                <th className="p-3 text-left">Plan</th>
                                                <th className="p-3 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.items?.map((item: any, i: number) => (
                                                <tr key={i} className="border-t">
                                                    <td className="p-3 font-medium">{item.service_name}</td>
                                                    <td className="p-3">
                                                        <Badge variant="secondary">{item.tier_name}</Badge>
                                                    </td>
                                                    <td className="p-3 text-right">₹{item.price}</td>
                                                </tr>
                                            ))}
                                            {!selectedOrder.items?.length && (
                                                <tr>
                                                    <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                                        No items details available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="bg-muted/50 font-medium">
                                            <tr>
                                                <td colSpan={2} className="p-3 text-right">Total Amount:</td>
                                                <td className="p-3 text-right">₹{selectedOrder.total_amount}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
