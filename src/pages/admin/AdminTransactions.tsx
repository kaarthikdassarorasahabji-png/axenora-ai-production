
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Download, CreditCard, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRealtimeOrders } from '@/hooks/useRealtimeOrders';
import { format } from 'date-fns';

export default function AdminTransactions() {
  const { orders, loading } = useRealtimeOrders();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter orders to only show those with payments (pending, confirmed, completed)
  // Ignoring failed/cancelled unless user wants to see them
  const transactions = orders.filter((order: any) => 
    order.status !== 'cancelled' && 
    (order.profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.razorpay_order_id?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalVolume = transactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground mt-2">
                Manage payments and financial records.
            </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹{totalVolume.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">All time transaction volume</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{transactions.filter(t => t.status === 'completed' || t.status === 'confirmed').length}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <CreditCard className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{transactions.filter(t => t.status === 'pending').length}</div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                    <div className="col-span-2">Customer</div>
                    <div>Order ID</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading transactions...</div>
                ) : transactions.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No transactions found</div>
                ) : (
                    transactions.map((tx) => (
                        <div key={tx.id} className="grid grid-cols-6 gap-4 p-4 items-center border-b last:border-0 hover:bg-muted/50 transition-colors">
                            <div className="col-span-2">
                                <div className="font-medium">{tx.profiles?.name || 'Unknown User'}</div>
                                <div className="text-sm text-muted-foreground">{tx.profiles?.email}</div>
                            </div>
                            <div className="font-mono text-sm">{(tx as any).razorpay_order_id || tx.id.slice(0,8)}</div>
                            <div className="text-sm text-muted-foreground">
                                {tx.created_at ? format(new Date(tx.created_at), 'MMM d, yyyy') : '-'}
                            </div>
                            <div className="font-medium">₹{tx.total_amount}</div>
                            <div>
                                <Badge variant={
                                    tx.status === 'completed' || tx.status === 'confirmed' ? 'default' : 
                                    tx.status === 'pending' ? 'secondary' : 'destructive'
                                } className={
                                    tx.status === 'completed' || tx.status === 'confirmed' ? 'bg-green-500 hover:bg-green-600' :
                                    tx.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''
                                }>
                                    {tx.status}
                                </Badge>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
