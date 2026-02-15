import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, ShoppingCart, TrendingUp, Zap, ExternalLink } from 'lucide-react';
import { ProfileCompletionModal } from '@/components/ProfileCompletionModal';
import { useRealtimeProfile } from '@/hooks/useRealtimeProfile';
import { useRealtimeUserStats } from '@/hooks/useRealtimeUserStats';

export default function DashboardHome() {
  const { profile } = useAuth();
  const { stats, loading } = useRealtimeUserStats();
  
  // Enable real-time profile updates
  useRealtimeProfile();
  
  const firstName = profile?.name?.split(' ')[0] || 'there';

  return (
    <>
      <ProfileCompletionModal />
      
      <div className="space-y-8 animate-fade-in pb-10">
        {/* Welcome Section with Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 p-8 border border-white/10 shadow-xl">
        <div className="relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 transition-colors pointer-events-none">
            Welcome Back
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Hello, {firstName}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
            Your command center for AI operations. Track performance, manage services, and scale your business with Axenora AI.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/dashboard/marketplace">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group hover:shadow-lg transition-all duration-300 border-white/10 bg-white/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Services</CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '...' : stats.activeServices}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Services currently running
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-white/10 bg-white/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '...' : stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lifetime orders placed
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-white/10 bg-white/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Investment</CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '...' : `₹${stats.totalInvestment.toLocaleString()}`}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total amount invested
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Info */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 border-white/10 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>
              Based on your business profile, we suggest these AI solutions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
               <div className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                     <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <Package className="h-4 w-4 text-indigo-500" />
                     </div>
                     <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold mb-1">AI Website Builder</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">Launch a stunning website in minutes with our AI tools.</p>
               </div>
               <div className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                     <div className="h-8 w-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-pink-500" />
                     </div>
                     <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold mb-1">Ads & Marketing</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">Scale your reach with AI-optimized ad campaigns.</p>
               </div>
            </div>
            <div className="mt-6">
                <Link to="/dashboard/marketplace">
                    <Button variant="outline" className="w-full">View All Services</Button>
                </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-b from-card to-background">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest account actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="text-muted-foreground flex-1">Account created</p>
                  <span className="text-xs text-muted-foreground">Just now</span>
               </div>
               <div className="flex items-center gap-4 text-sm opacity-50">
                  <div className="h-2 w-2 rounded-full bg-muted" />
                  <p className="text-muted-foreground flex-1">No orders yet</p>
               </div>
            </div>
            <div className="mt-8 pt-6 border-t">
               <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" disabled>
                  View Activity Log
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
