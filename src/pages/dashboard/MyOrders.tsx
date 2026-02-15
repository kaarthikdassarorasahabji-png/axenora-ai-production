import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Package, Calendar, CreditCard, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRealtimeOrders } from '@/hooks/useRealtimeOrders';

interface OrderItem {
  id: string;
  service_name: string;
  tier_name: string;
  price: number;
  billing_cycle: string;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  confirmed_at?: string;
  items?: OrderItem[];
}

export default function MyOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Use real-time orders hook with toast notifications
  const { orders, loading } = useRealtimeOrders({ 
    userId: user?.id,
    showToasts: true 
  });

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-500/10 text-yellow-500',
      confirmed: 'bg-blue-500/10 text-blue-500',
      processing: 'bg-indigo-500/10 text-indigo-500',
      completed: 'bg-green-500/10 text-green-500',
      cancelled: 'bg-red-500/10 text-red-500',
      delivered: 'bg-green-500/10 text-green-500'
    };
    
    return (
      <Badge variant="secondary" className={styles[status] || 'bg-gray-500/10 text-gray-500'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your service purchases
          </p>
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-6">
              No orders yet. Visit the marketplace to purchase services.
            </p>
            <Button onClick={() => navigate('/dashboard/marketplace')}>
              Browse Services
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your service purchases
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2 border-green-500 text-green-500">
          <Radio className="h-3 w-3 animate-pulse" />
          Live
        </Badge>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Order {order.order_number}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={order.status} />
                  <Badge 
                    variant="outline" 
                    className={order.payment_status === 'paid' 
                      ? 'border-green-500 text-green-500' 
                      : 'border-yellow-500 text-yellow-500'}
                  >
                    <CreditCard className="h-3 w-3 mr-1" />
                    {order.payment_status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {order.items && order.items.length > 0 && (
                <div className="space-y-3 mb-4">
                  <p className="text-sm font-medium">Order Items:</p>
                  {order.items.map((item, idx) => (
                    <div key={item.id || idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.service_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.tier_name} • {item.billing_cycle}
                        </p>
                      </div>
                      <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">₹{order.total_amount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
