import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, user, isAdmin, isAdminLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    // Wait until admin check is complete
    if (!isAdminLoading && user) {
      if (isAdmin) {
        console.log('✅ Already logged in as admin, redirecting to dashboard');
        toast.success('Welcome Admin!');
        navigate('/admin', { replace: true });
      } else {
        console.log('⚠️ Logged in but not admin');
        toast.error('Anda tidak memiliki akses admin');
        navigate('/', { replace: true });
      }
    }
  }, [user, isAdmin, isAdminLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔐 Attempting admin login...');
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('❌ Login error:', error);
        toast.error('Login gagal: ' + (error.message || 'Terjadi kesalahan'));
        setLoading(false);
        return;
      }

      console.log('✅ Login successful, waiting for admin check...');
      toast.success('Login berhasil! Memeriksa akses admin...');
      
      // Don't set loading to false here, let useEffect handle navigation
      // Loading will be cleared when component unmounts or admin check completes
      
    } catch (err) {
      console.error('❌ Login exception:', err);
      toast.error('Terjadi kesalahan tidak terduga');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Masuk ke panel admin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Admin</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pancingpro.com"
                required
                autoComplete="email"
                disabled={loading || isAdminLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={loading || isAdminLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || isAdminLoading}
            >
              {loading || isAdminLoading ? 'Memproses...' : 'Login sebagai Admin'}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/auth')}
                className="text-sm text-muted-foreground"
                disabled={loading || isAdminLoading}
              >
                Login sebagai user biasa
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;