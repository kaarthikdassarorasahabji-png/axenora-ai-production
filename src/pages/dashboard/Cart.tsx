import { useCart } from '@/contexts/CartContext';
import { API_BASE_URL } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, CreditCard, ShoppingBag, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Cart() {
  const { items, removeItem, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    // Get session safely
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
        toast({
            title: "Session Expired",
            description: "Please login again to continue.",
            variant: "destructive"
        });
        navigate('/login');
        return;
    }

    // Prepare order data
    const orderData = {
      items: items,
      billingInfo: {
        name: user.user_metadata?.name || 'User',
        email: user.email
      }
      // Razorpay integration will go here
    };

    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to payment gateway...",
    });
    
    // For now, let's simulate a successful order creation
    try {
       const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if(data.success) {
         clearCart();
         navigate('/dashboard/orders');
         toast({
            title: "Order Placed!",
            description: "Your order has been created successfully."
         })
      }

    } catch(err) {
        console.error(err);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">
          Browse our marketplace to find the perfect solutions for your business.
        </p>
        <Button onClick={() => navigate('/dashboard/marketplace')}>
          Browse Services
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.serviceId}-${item.tierId}`} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 bg-primary/10 rounded flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                 </div>
                 <div>
                    <h3 className="font-medium">{item.serviceName}</h3>
                    <p className="text-sm text-muted-foreground">{item.tierName} Plan ({item.billingCycle})</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-medium">₹{item.price.toLocaleString()}</span>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.serviceId, item.tierId)}>
                    <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center text-lg font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <Button 
                className="w-full btn-primary" 
                size="lg"
                onClick={() => navigate('/dashboard/checkout')}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
