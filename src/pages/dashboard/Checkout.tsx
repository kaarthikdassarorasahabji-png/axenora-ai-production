import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useRazorpay } from 'react-razorpay';
import { supabase } from '@/lib/supabase';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { Razorpay } = useRazorpay();
  const [loading, setLoading] = useState(false);

  /* useEffect to update billing details when profile loads */
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'India'
  });

  useEffect(() => {
    if (profile || user) {
      setBillingDetails(prev => ({
        ...prev,
        name: prev.name || profile?.name || '',
        email: prev.email || user?.email || '',
        phone: prev.phone || profile?.phone || '',
        company: prev.company || profile?.company || ''
      }));
    }
  }, [profile, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!billingDetails.name || !billingDetails.email || !billingDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required billing details.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Get the authentication token first
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error('You must be logged in to complete checkout');
      }

      // 1. Create Order on Backend
      
      const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          items,
          total,
          billingDetails
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order');
      }

      // 2. Initialize Razorpay Payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Axenora AI",
        description: "Service Subscription",
        image: "/Logo.png",
        order_id: data.order.id,
        handler: async (response: any) => {
          try {
            // Get fresh token for verification
            const { data: { session: verifySession } } = await supabase.auth.getSession();
            
            // 3. Verify Payment on Backend
            const verifyResponse = await fetch(`${API_BASE_URL}/api/orders/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${verifySession?.access_token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.internalOrderId // ID from our database
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              clearCart();
              toast({
                title: "Payment Successful!",
                description: "Your order has been confirmed.",
              });
              navigate('/dashboard/orders');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification Error:', error);
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if amount was deducted.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: billingDetails.name,
          email: billingDetails.email,
          contact: billingDetails.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();

    } catch (error: any) {
      console.error('Payment Error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Could not initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!items) {
      return <div className="p-10 text-center">Loading Cart...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Add services to your cart to proceed with checkout.</p>
        <Button onClick={() => navigate('/dashboard/marketplace')}>
          Browse Services
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Enter details for the invoice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" value={billingDetails.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" value={billingDetails.phone} onChange={handleInputChange} required />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="email">Email Address *</Label>
                 <Input id="email" name="email" value={billingDetails.email} onChange={handleInputChange} required />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
                 <Input id="whatsapp" name="whatsapp" placeholder="For project updates" value={(billingDetails as any).whatsapp || ''} onChange={handleInputChange} />
               </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" name="company" value={billingDetails.company} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={billingDetails.address} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={billingDetails.city} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={billingDetails.state} onChange={handleInputChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-start text-sm">
                  <div>
                    <p className="font-medium">{item.serviceName}</p>
                    <p className="text-muted-foreground">{item.tierName} Plan ({item.billingCycle})</p>
                  </div>
                  <span className="font-medium">₹{item.price.toLocaleString()}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full h-12 text-lg" 
            size="lg" 
            onClick={handlePayment} 
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Razorpay. By continuing, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
