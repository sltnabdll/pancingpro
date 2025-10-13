import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeItem, updateQuantity, updateRentalDays, getTotalPrice } = useCart();

  const handleRemoveItem = (productId: string, type: 'rent' | 'buy') => {
    removeItem(productId, type);
    toast.success('Produk dihapus dari keranjang');
  };

  const handleUpdateQuantity = (productId: string, type: 'rent' | 'buy', currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty > 0) {
      updateQuantity(productId, type, newQty);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartItemsCount={0} />
        <div className="flex-grow flex items-center justify-center py-16">
          <div className="text-center animate-fade-in">
            <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Keranjang Belanja Kosong</h2>
            <p className="text-muted-foreground mb-6">
              Belum ada produk di keranjang Anda
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 animate-fade-in">Keranjang Belanja</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card key={`${item.product.id}-${item.type}`} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <Badge variant={item.type === 'rent' ? 'secondary' : 'default'} className="mt-1">
                              {item.type === 'rent' ? 'Sewa' : 'Beli'}
                            </Badge>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveItem(item.product.id, item.type)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {item.type === 'rent' && item.rentalDays && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Durasi:</span>
                              <Input
                                type="number"
                                min="1"
                                value={item.rentalDays}
                                onChange={(e) => updateRentalDays(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-20 h-8"
                              />
                              <span className="text-sm">hari</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.product.id, item.type, item.quantity, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.product.id, item.type, item.quantity, 1)}
                                disabled={item.quantity >= item.product.stock}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold text-lg">
                                Rp {(
                                  item.type === 'rent' && item.product.rentalPrice && item.rentalDays
                                    ? item.product.rentalPrice * item.rentalDays * item.quantity
                                    : item.product.buyPrice * item.quantity
                                ).toLocaleString('id-ID')}
                              </p>
                              {item.type === 'rent' && item.product.rentalPrice && item.rentalDays && (
                                <p className="text-xs text-muted-foreground">
                                  Rp {item.product.rentalPrice.toLocaleString('id-ID')}/hari
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20 animate-fade-in">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Ringkasan Pesanan</h2>
                  
                  <div className="space-y-2 py-4 border-y">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Item</span>
                      <span className="font-medium">{items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Total Harga</span>
                      <span className="font-bold text-xl text-primary">
                        Rp {getTotalPrice().toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <Link to="/checkout" className="block">
                    <Button variant="hero" size="lg" className="w-full">
                      Lanjut ke Pembayaran
                    </Button>
                  </Link>

                  <Link to="/products" className="block">
                    <Button variant="outline" className="w-full">
                      Lanjut Belanja
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
