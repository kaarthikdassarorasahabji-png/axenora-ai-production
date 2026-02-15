import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Building, Phone, Shield, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export default function Settings() {
  const { profile, user, refreshProfile } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        company: profile.company || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          phone: formData.phone,
          company: formData.company
        })
        .eq('id', user.id);

      if (error) throw error;

      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
      if (!refreshError && session) {
        await refreshProfile();
      } else {
        await refreshProfile();
      }
      
      toast({
        title: "Profile Updated",
        description: "Your settings have been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Could not save changes.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar / User Card */}
        <Card className="md:col-span-1 h-fit">
            <CardHeader className="text-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-xl">{profile?.name || 'User'}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <Badge variant="outline" className="w-fit mx-auto mt-2 capitalize px-3">
                    {profile?.role || 'User'}
                </Badge>
            </CardHeader>
        </Card>

        {/* Profile Form */}
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your contact details and company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={handleInputChange}
                                className="pl-9" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="email" defaultValue={user?.email} className="pl-9" disabled />
                        </div>
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                id="phone" 
                                value={formData.phone} 
                                onChange={handleInputChange}
                                placeholder="+1 234 567 890" 
                                className="pl-9" 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                id="company" 
                                value={formData.company} 
                                onChange={handleInputChange}
                                placeholder="Acme Inc." 
                                className="pl-9" 
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security
                </CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline">Change Password</Button>
            </CardContent>
       </Card>
    </div>
  );
}
