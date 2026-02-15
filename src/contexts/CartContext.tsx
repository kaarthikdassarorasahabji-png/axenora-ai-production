import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  serviceId: string;
  tierId: string;
  serviceName: string;
  tierName: string;
  price: number;
  billingCycle: string;
  features: string[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (serviceId: string, tierId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addItem = (item: CartItem) => {
    setItems(current => {
      // Check if item already exists
      const exists = current.find(
        i => i.serviceId === item.serviceId && i.tierId === item.tierId
      );

      if (exists) {
        toast({
          title: "Already in Cart",
          description: "This item is already in your cart.",
        });
        return current;
      }

      toast({
        title: "Added to Cart",
        description: `${item.serviceName} (${item.tierName}) added to your cart.`,
      });


      return [...current, item];
    });
  };

  const removeItem = (serviceId: string, tierId: string) => {
    setItems(current => 
      current.filter(i => !(i.serviceId === serviceId && i.tierId === tierId))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => {

      return sum + (Number(item.price) || 0);
  }, 0);
  


  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
