import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag, DollarSign, TrendingUp, Activity, Radio, Calendar } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useRealtimeAdminStats } from '@/hooks/useRealtimeAdminStats';
import { useRealtimeOrders } from '@/hooks/useRealtimeOrders';

export default function AdminDashboard() {
  const { stats, loading: statsLoading, lastUpdated } = useRealtimeAdminStats();
  const { orders, loading: ordersLoading } = useRealtimeOrders({ showToasts: true });
  
  const loading = statsLoading || ordersLoading;
  const recentOrders = orders.slice(0, 5); // Show 5 most recent orders

  // Calculate Chart Data (Monthly Revenue)
  const chartData = orders.reduce((acc: any[], order: any) => {
    if (order.payment_status !== 'paid') return acc;
    
    const date = new Date(order.created_at);
    const month = date.toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.name === month);
    
    if (existing) {
      existing.total += order.total_amount;
    } else {
      acc.push({ name: month, total: order.total_amount });
    }
    return acc;
  }, []).reverse(); // Show oldest to newest if orders are sorted newest first

  // If no data, show placeholder data
  const displayData = chartData.length > 0 ? chartData : [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
  ];

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      description: 'From completed orders',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Active Clients',
      value: stats.activeClients,
      description: 'Total registered users',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      description: 'Awaiting confirmation',
      icon: ShoppingBag,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Active Services',
      value: stats.activeServices,
      description: 'Currently running',
      icon: Activity,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="flex items-center space-x-3">
            <Badge variant="outline" className="flex items-center gap-2 border-green-500 text-green-500">
              <Radio className="h-3 w-3 animate-pulse" />
              Live
            </Badge>
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart Placeholder */}
        <Card className="col-span-4 border-border/50">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
                Monthly revenue performance for the current year
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Chart would go here */}
            {/* Real Chart */}
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={displayData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${value}`} 
                  />
                   <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#10b981' }}
                    formatter={(value: number) => [`₹${value}`, 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="col-span-3 border-border/50">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest transactions from your store
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
                {loading ? (
                    <p className="text-sm text-muted-foreground text-center">Loading orders...</p>
                ) : recentOrders.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center">No recent orders found.</p>
                ) : (
                    recentOrders.map((order: any) => (
                        <div key={order.id} className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{order.profiles?.name || 'Guest User'}</p>
                                <p className="text-xs text-muted-foreground">{order.profiles?.email}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-bold text-sm">₹{order.total_amount}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${
                                    order.status === 'confirmed' || order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                    order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                                    'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
