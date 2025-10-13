import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/hooks/useCart';
import { useCreateOrder } from '@/hooks/useOrders';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentMethod } from '@/types/product';
import { CreditCard, Smartphone, QrCode, Upload } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      toast.error('Silakan login terlebih dahulu');
    }
  }, [user, navigate]);

  const handlePaymentProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB');
        return;
      }
      setPaymentProof(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/auth');
      return;
    }

    if (!name || !phone || !email || !address) {
      toast.error('Mohon lengkapi semua data!');
      return;
    }

    if (!paymentProof) {
      toast.error('Mohon upload bukti transfer!');
      return;
    }

    setUploading(true);

    try {
      const order = await createOrder.mutateAsync({
        name,
        email,
        phone,
        address,
        paymentMethod,
        notes,
        paymentProof,
        items,
        total: getTotalPrice()
      });

      toast.success('Pesanan berhasil dibuat! Silakan tunggu konfirmasi admin.');
      
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const paymentIcons = {
    bank: CreditCard,
    gopay: Smartphone,
    ovo: Smartphone,
    dana: Smartphone,
    qris: QrCode
  };

  const paymentLabels = {
    bank: 'Transfer Bank',
    gopay: 'GoPay',
    ovo: 'OVO',
    dana: 'DANA',
    qris: 'QRIS'
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 animate-fade-in">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Information */}
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Informasi Pelanggan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08123456789"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat Lengkap *</Label>
                      <Textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Jalan, Kota, Provinsi"
                        required
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Catatan (Opsional)</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Catatan tambahan untuk pesanan Anda"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle>Metode Pembayaran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                      className="space-y-3"
                    >
                      {(Object.keys(paymentLabels) as PaymentMethod[]).map((method) => {
                        const Icon = paymentIcons[method];
                        return (
                          <div key={method} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value={method} id={method} />
                            <Label 
                              htmlFor={method} 
                              className="flex items-center gap-3 cursor-pointer flex-grow"
                            >
                              <Icon className="h-5 w-5 text-primary" />
                              <span>{paymentLabels[method]}</span>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Proof Upload */}
                <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <CardHeader>
                    <CardTitle>Upload Bukti Transfer *</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-proof">
                        Upload bukti transfer (JPG, PNG, max 5MB)
                      </Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="payment-proof"
                          type="file"
                          accept="image/*"
                          onChange={handlePaymentProofChange}
                          required
                          className="cursor-pointer"
                        />
                        {paymentProof && (
                          <Upload className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      {paymentProof && (
                        <p className="text-sm text-muted-foreground">
                          File: {paymentProof.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                      <p className="font-semibold">Informasi Rekening Transfer:</p>
                      <div className="space-y-1">
                        <p>Bank BCA: 1234567890</p>
                        <p>Bank Mandiri: 0987654321</p>
                        <p>a.n. Pancing Pro</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <CardHeader>
                    <CardTitle>Ringkasan Pesanan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.type}`} className="flex justify-between text-sm">
                          <div className="flex-grow">
                            <p className="font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {item.type === 'rent' ? `Sewa ${item.rentalDays} hari` : 'Beli'} × {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium ml-2">
                            Rp {(
                              item.type === 'rent' && item.product.rentalPrice && item.rentalDays
                                ? item.product.rentalPrice * item.rentalDays * item.quantity
                                : item.product.buyPrice * item.quantity
                            ).toLocaleString('id-ID')}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-primary">
                          Rp {getTotalPrice().toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={createOrder.isPending || uploading}
                    >
                      {(createOrder.isPending || uploading) ? 'Memproses...' : 'Kirim Pesanan'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
