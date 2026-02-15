import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
      
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Flatten orders to get all items (services)
        const allItems = data.data.flatMap((order: any) => 
          order.items?.map((item: any) => ({
            ...item,
            order_status: order.status,
            order_date: order.created_at,
            payment_status: order.payment_status
          })) || []
        );
        setServices(allItems);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast({ title: "Error", description: "Could not load your services" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
      case 'confirmed':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Services</h1>
        <p className="text-muted-foreground">Manage your active subscriptions and solutions.</p>
      </div>

      {services.length === 0 ? (
        <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Active Services</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    You haven't purchased any services yet. Visit the marketplace to get started with AI solutions.
                </p>
                <Button onClick={() => navigate('/dashboard/marketplace')}>
                    Browse Marketplace
                </Button>
            </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, i) => (
                <Card key={i} className="flex flex-col border-l-4 border-l-primary/50">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <Badge variant="outline" className="mb-2 uppercase text-[10px] tracking-wider">
                                {item.tier_name} Tier
                            </Badge>
                            {getStatusIcon(item.order_status)}
                        </div>
                        <CardTitle className="text-xl">{item.service_name}</CardTitle>
                        <CardDescription>
                            Activated on {new Date(item.order_date).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <div className="flex justify-between items-center text-sm py-2 border-t mt-2">
                            <span className="text-muted-foreground">Status</span>
                            <Badge variant={item.order_status === 'delivered' ? 'default' : 'secondary'} className="capitalize">
                                {item.order_status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm py-2 border-t">
                            <span className="text-muted-foreground">Billing</span>
                            <span className="font-medium capitalize">{item.billing_cycle}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
    </div>
  );
}
