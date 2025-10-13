import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { CheckCircle, MessageCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('lastOrder');
    if (!storedOrder) {
      navigate('/');
      return;
    }
    
    setOrderData(JSON.parse(storedOrder));
  }, [navigate]);

  if (!orderData) {
    return null;
  }

  const paymentLabels: Record<string, string> = {
    bank: 'Transfer Bank',
    gopay: 'GoPay',
    ovo: 'OVO',
    dana: 'DANA',
    qris: 'QRIS'
  };

  const whatsappMessage = `Halo Alat Pancing Pro! Saya ingin konfirmasi pesanan atas nama ${orderData.name}. Total: Rp ${orderData.total.toLocaleString('id-ID')}`;
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-4">
              <CheckCircle className="h-12 w-12 text-secondary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Pesanan Berhasil!</h1>
            <p className="text-lg text-muted-foreground">
              Terima kasih atas pesanan Anda
            </p>
          </div>

          <div className="space-y-6">
            {/* Order Details */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Nama</p>
                    <p className="font-medium">{orderData.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Telepon</p>
                    <p className="font-medium">{orderData.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{orderData.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Metode Pembayaran</p>
                    <p className="font-medium">{paymentLabels[orderData.paymentMethod]}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1 text-sm">Alamat Pengiriman</p>
                  <p className="font-medium">{orderData.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle>Produk yang Dipesan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderData.items.map((item: any) => (
                    <div key={`${item.product.id}-${item.type}`} className="flex justify-between items-start pb-3 border-b last:border-0">
                      <div className="flex gap-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={item.type === 'rent' ? 'secondary' : 'default'} className="text-xs">
                              {item.type === 'rent' ? 'Sewa' : 'Beli'}
                            </Badge>
                            {item.type === 'rent' && (
                              <Badge variant="outline" className="text-xs">
                                {item.rentalDays} hari
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Jumlah: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        Rp {(
                          item.type === 'rent' && item.product.rentalPrice && item.rentalDays
                            ? item.product.rentalPrice * item.rentalDays * item.quantity
                            : item.product.buyPrice * item.quantity
                        ).toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total Pembayaran</span>
                    <span className="font-bold text-2xl text-primary">
                      Rp {orderData.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-muted/50 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Langkah Selanjutnya:</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Lakukan pembayaran sesuai metode yang dipilih</li>
                  <li>Konfirmasi pembayaran melalui WhatsApp</li>
                  <li>Tim kami akan memproses pesanan Anda</li>
                  <li>Pesanan akan dikirim/siap diambil sesuai jadwal</li>
                </ol>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="hero" size="lg" className="w-full">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Konfirmasi via WhatsApp
                </Button>
              </a>
              <Link to="/" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
