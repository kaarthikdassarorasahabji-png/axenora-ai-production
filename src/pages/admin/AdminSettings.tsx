import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function AdminSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    razorpay_config: { test_mode: true },
    email_notifications: {
      order_confirmation: true,
      status_update: true,
      service_activation: true,
      invoice: true
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
      const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        // Merge with defaults to ensure all keys exist
        setSettings(prev => ({ ...prev, ...data.data }));
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast({ title: "Error", description: "Could not load settings" });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    setSaving(true);
    try {
      const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
      const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ key, value })
      });
      
      if (response.ok) {
        setSettings(prev => ({ ...prev, [key]: value }));
        toast({ title: "Settings Saved", description: "Configuration updated successfully." });
      } else {
        throw new Error('Failed to update');
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save changes", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleRazorpayChange = (field: string, value: boolean) => {
    const newConfig = { ...settings.razorpay_config, [field]: value };
    updateSetting('razorpay_config', newConfig);
  };

  const handleEmailChange = (field: string, value: boolean) => {
    const newConfig = { ...settings.email_notifications, [field]: value };
    updateSetting('email_notifications', newConfig);
  };

  if (loading) {
    return <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and integrations.</p>
      </div>

      <div className="grid gap-6">
        {/* Payment Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Payment Configuration</CardTitle>
            <CardDescription>Manage Razorpay keys and payment settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Razorpay Key ID</Label>
                  <Input type="password" value="****************" disabled placeholder="Managed in environment variables" />
               </div>
               <div className="space-y-2">
                  <Label>Razorpay Key Secret</Label>
                  <Input type="password" value="****************" disabled placeholder="Managed in environment variables" />
               </div>
            </div>
            <div className="flex items-center space-x-2">
               <Switch 
                 id="test-mode" 
                 checked={settings.razorpay_config?.test_mode}
                 onCheckedChange={(checked) => handleRazorpayChange('test_mode', checked)}
               />
               <Label htmlFor="test-mode">Enable Test Mode (simulates payments)</Label>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Configure automatic emails sent to customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
                <Label className="flex-1">Order Confirmation Email</Label>
                <Switch 
                  checked={settings.email_notifications?.order_confirmation}
                  onCheckedChange={(c) => handleEmailChange('order_confirmation', c)}
                />
             </div>
             <Separator />
             <div className="flex items-center justify-between">
                <Label className="flex-1">Status Update Email</Label>
                <Switch 
                  checked={settings.email_notifications?.status_update}
                  onCheckedChange={(c) => handleEmailChange('status_update', c)}
                />
             </div>
             <Separator />
             <div className="flex items-center justify-between">
                <Label className="flex-1">Service Activation Email</Label>
                <Switch 
                  checked={settings.email_notifications?.service_activation}
                  onCheckedChange={(c) => handleEmailChange('service_activation', c)}
                />
             </div>
             <Separator />
             <div className="flex items-center justify-between">
                <Label className="flex-1">Invoice Email</Label>
                <Switch 
                  checked={settings.email_notifications?.invoice}
                  onCheckedChange={(c) => handleEmailChange('invoice', c)}
                />
             </div>
          </CardContent>
        </Card>

        {/* Admin Access */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>Manage who has access to this dashboard</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground mb-4">You are currently logged in as Super Admin.</p>
             <Button variant="outline">Manage Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
