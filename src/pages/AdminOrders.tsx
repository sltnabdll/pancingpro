import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AdminOrders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast({
        title: 'Berhasil',
        description: 'Status pesanan berhasil diperbarui',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const getPaymentProofUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('payment-proofs')
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const viewPaymentProof = async (fileName: string) => {
    if (!fileName) {
      toast({
        title: 'Error',
        description: 'Bukti pembayaran tidak tersedia',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from('payment-proofs')
        .createSignedUrl(fileName, 60);

      if (error) throw error;

      window.open(data.signedUrl, '_blank');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Gagal membuka bukti pembayaran',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'payment_submitted':
        return <Badge variant="secondary">Menunggu Konfirmasi</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-600">Dikonfirmasi</Badge>;
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

  const filterOrdersByType = (type: string) => {
    if (!orders) return [];
    if (type === 'all') return orders;
    
    return orders.filter((order: any) => {
      const hasType = order.order_items?.some((item: any) => {
        if (type === 'rent') return item.item_type === 'rent';
        if (type === 'buy') return item.item_type === 'buy';
        return false;
      });
      return hasType;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const renderOrders = (filteredOrders: any[]) => (
    filteredOrders && filteredOrders.length > 0 ? (
      <div className="space-y-4">
        {filteredOrders.map((order: any) => (
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

              <div className="grid md:grid-cols-2 gap-4 mb-4">
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
                  <h3 className="font-semibold mb-2">Informasi Pembayaran</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Metode:</span> {order.payment_method}</p>
                    <p><span className="font-medium">Total:</span> {formatCurrency(order.total_amount)}</p>
                    {order.notes && (
                      <p><span className="font-medium">Catatan:</span> {order.notes}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
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

              <div className="flex gap-2">
                {order.payment_proof_name && (
                  <Button
                    variant="outline"
                    onClick={() => viewPaymentProof(order.payment_proof_name)}
                  >
                    Lihat Bukti Pembayaran
                  </Button>
                )}

                {order.status === 'payment_submitted' && (
                  <>
                    <Button
                      onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'confirmed' })}
                      disabled={updateOrderStatus.isPending}
                    >
                      Konfirmasi Pesanan
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'rejected' })}
                      disabled={updateOrderStatus.isPending}
                    >
                      Tolak Pesanan
                    </Button>
                  </>
                )}
              </div>
          </Card>
        ))}
      </div>
    ) : (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Belum ada pesanan</p>
      </Card>
    )
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kelola Pesanan</h2>
        <p className="text-muted-foreground">Tinjau dan kelola pesanan pelanggan</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="buy">Pembelian</TabsTrigger>
          <TabsTrigger value="rent">Penyewaan</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {renderOrders(filterOrdersByType('all'))}
        </TabsContent>

        <TabsContent value="buy" className="space-y-4 mt-6">
          {renderOrders(filterOrdersByType('buy'))}
        </TabsContent>

        <TabsContent value="rent" className="space-y-4 mt-6">
          {renderOrders(filterOrdersByType('rent'))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminOrders;
