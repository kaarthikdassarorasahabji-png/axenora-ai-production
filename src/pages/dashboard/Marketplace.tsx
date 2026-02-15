import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2, 
  Check, 
  ShoppingCart, 
  BrainCircuit, 
  Code2, 
  Phone,
  MessageCircle,
  ShoppingBag 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ServiceTier {
  id: string;
  tier_name: string;
  price: number;
  billing_cycle: string;
  features: string[];
  is_popular: boolean;
}

interface Service {
  id: string;
  name: string; // Changed back to name to match data
  title?: string; // Optional if needed
  description: string;
  category: string;
  // icon removed as it's not in API data, handled statically
  tiers: ServiceTier[];
}

import { useCart } from '@/contexts/CartContext';

export default function Marketplace() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  const { addItem } = useCart();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`);
      const data = await response.json();

      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast({
        title: 'Error',
        description: 'Failed to load services. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (service: Service, tier: ServiceTier) => {
    addItem({
      serviceId: service.id,
      tierId: tier.id,
      serviceName: service.name,
      tierName: tier.tier_name,
      price: tier.price,
      billingCycle: tier.billing_cycle,
      features: tier.features
    });
  };

  const categories = ['all', 'website', 'ads', 'whatsapp', 'chatbot', 'calling'];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Service Marketplace
        </h1>
        <p className="text-muted-foreground text-lg">
          Transform your business with our AI-powered solutions
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-secondary/30 backdrop-blur-sm rounded-xl mb-8">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="capitalize px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          <div className="flex flex-col gap-12">
            {filteredServices.map((service) => (
              <div key={service.id} className="relative group w-full">
                 {/* Glassmorphism Background */}
                 <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl -z-10" />
                 
                 <div className="flex flex-col h-full space-y-4">
                    <div className="flex items-center space-x-4 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                            {service.category === 'website' && <Code2 className="w-6 h-6 text-primary" />}
                            {service.category === 'ads' && <ShoppingBag className="w-6 h-6 text-primary" />}
                            {service.category === 'whatsapp' && <MessageCircle className="w-6 h-6 text-primary" />}
                            {service.category === 'chatbot' && <BrainCircuit className="w-6 h-6 text-primary" />}

                            {service.category === 'calling' && <Phone className="w-6 h-6 text-primary" />}
                            {service.category === 'all' && <ShoppingBag className="w-6 h-6 text-primary" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {service.tiers.map((tier, i) => (
                            <Card key={i} className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${tier.is_popular ? 'border-primary shadow-md scale-[1.02]' : 'border-border/50 hover:border-primary/30'}`}>
                                {tier.is_popular && (
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        POPULAR
                                    </div>
                                )}
                                <CardContent className="p-5 flex flex-col h-full">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-lg">{tier.tier_name}</h4>
                                        <div className="flex items-baseline mt-1">
                                            {tier.billing_cycle === 'custom' ? (
                                              <span className="text-2xl font-bold">Contact Us</span>
                                            ) : (
                                              <>
                                                <span className="text-2xl font-bold">₹{tier.price.toLocaleString()}</span>
                                                <span className="text-xs text-muted-foreground ml-1">
                                                  {tier.billing_cycle === 'one-time' ? ' one-time' : `/${tier.billing_cycle}`}
                                                </span>
                                              </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <ul className="space-y-2 mb-6 flex-1">
                                        {tier.features.slice(0, 4).map((feature, idx) => (
                                            <li key={idx} className="text-sm flex items-start text-muted-foreground">
                                                <Check className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
                                                <span className="line-clamp-1">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button 
                                        className={`w-full ${tier.is_popular ? 'bg-primary hover:bg-primary/90' : 'variant-outline'}`}
                                        variant={tier.is_popular ? 'default' : 'outline'}
                                        onClick={() => tier.billing_cycle === 'custom' ? window.location.href = '/contact' : handlePurchase(service, tier)}
                                    >
                                        {tier.billing_cycle === 'custom' ? 'Contact Sales' : `Choose ${tier.tier_name}`}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
