import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Users, 
  ShoppingBag, 
  Package, 
  Settings, 
  LogOut, 
  Home,
  Bell,
  CreditCard,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AdminLayout() {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', icon: BarChart, path: '/admin' },
    { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { label: 'Clients', icon: Users, path: '/admin/clients' },
    { label: 'Services', icon: Package, path: '/admin/services' },
    { label: 'Transactions', icon: CreditCard, path: '/admin/transactions' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/95 backdrop-blur z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/admin">
             <img src="/Logo.png" alt="Axenora AI" className="h-8 w-auto" />
          </Link>
          <span className="ml-2 font-bold text-lg hidden md:block">Admin Panel</span>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xl mx-8">
            <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders, clients, services..." className="pl-9 w-full bg-muted/50" />
            </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{profile?.name}</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
             </div>
             <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
             </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card/50 hidden md:flex flex-col sticky top-16 h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : ""}`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="p-4 border-t">
             <Link to="/dashboard">
                <Button variant="outline" className="w-full justify-start mb-2">
                    <Home className="mr-2 h-4 w-4" />
                    Back to App
                </Button>
             </Link>
            <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        {/* MainContent */}
        <main className="flex-1 p-6 md:p-8 bg-muted/10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
