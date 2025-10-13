import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useUserOrders } from '@/hooks/useOrders';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const MyOrders = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useUserOrders();
  const { items } = useCart();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'payment_submitted':
        return <Badge variant="secondary">Menunggu Konfirmasi</Badge>;
      case 'confirmed':
        return <Badge variant="default" className="bg-green-600">Dikonfirmasi</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      case 'pending_payment':
        return <Badge variant="outline">Belum Bayar</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Pesanan Saya</h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <Card key={order.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Informasi Pelanggan</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Nama:</span> {order.customer_name}</p>
                      <p><span className="font-medium">Email:</span> {order.customer_email}</p>
                      <p><span className="font-medium">Telepon:</span> {order.customer_phone}</p>
                      <p><span className="font-medium">Alamat:</span> {order.customer_address}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Item Pesanan</h3>
                    <div className="space-y-2">
                      {order.order_items?.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <img 
                            src={item.product_image} 
                            alt={item.product_name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-grow">
                            <p className="font-medium">{item.product_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.item_type === 'rent' ? 'Sewa' : 'Beli'} • {item.quantity}x
                              {item.rental_days && ` • ${item.rental_days} hari`}
                            </p>
                          </div>
                          <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <p className="font-semibold">Total</p>
                    <p className="text-xl font-bold">{formatCurrency(order.total_amount)}</p>
                  </div>

                  {order.notes && (
                    <div className="text-sm">
                      <span className="font-medium">Catatan:</span> {order.notes}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Belum ada pesanan</p>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyOrders;
