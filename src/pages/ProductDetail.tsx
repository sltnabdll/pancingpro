import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/useCart';
import { useProduct } from '@/hooks/useProducts';
import { ArrowLeft, ShoppingCart, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addItem } = useCart();
  const { data: product, isLoading } = useProduct(id);

  const [quantity, setQuantity] = useState(1);
  const [rentalDays, setRentalDays] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartItemsCount={items.length} />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Memuat produk...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar cartItemsCount={items.length} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
            <Link to="/products">
              <Button>Kembali ke Katalog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (type: 'rent' | 'buy') => {
    if (quantity > product.stock) {
      toast.error('Jumlah melebihi stok tersedia!');
      return;
    }

    addItem(product, type, quantity, type === 'rent' ? rentalDays : undefined);
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  const rentalTotal = product.rentalPrice ? product.rentalPrice * rentalDays * quantity : 0;
  const buyTotal = product.buyPrice * quantity;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 animate-fade-in"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden border bg-card">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2 capitalize">
                  {product.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  {product.canRent && product.rentalPrice && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-muted-foreground mb-1">Harga Sewa</p>
                      <p className="text-3xl font-bold text-secondary">
                        Rp {product.rentalPrice.toLocaleString('id-ID')}
                        <span className="text-base font-normal text-muted-foreground">/hari</span>
                      </p>
                    </div>
                  )}
                  {product.canBuy && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Harga Beli</p>
                      <p className="text-3xl font-bold text-primary">
                        Rp {product.buyPrice.toLocaleString('id-ID')}
                      </p>
                    </div>
                  )}
                  <div className="pt-4 border-t">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Stok Tersedia:</span>{' '}
                      <span className="font-semibold">{product.stock} unit</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Order Options */}
              <Tabs defaultValue={product.canRent ? 'rent' : 'buy'} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  {product.canRent && <TabsTrigger value="rent">Sewa</TabsTrigger>}
                  {product.canBuy && <TabsTrigger value="buy">Beli</TabsTrigger>}
                </TabsList>

                {product.canRent && (
                  <TabsContent value="rent" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rental-days">Durasi Sewa (hari)</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="rental-days"
                          type="number"
                          min="1"
                          value={rentalDays}
                          onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                          className="max-w-[120px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity-rent">Jumlah</Label>
                      <Input
                        id="quantity-rent"
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                        className="max-w-[120px]"
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Total Biaya Sewa</p>
                      <p className="text-2xl font-bold text-secondary">
                        Rp {rentalTotal.toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {quantity} unit × {rentalDays} hari × Rp {product.rentalPrice?.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      variant="hero"
                      onClick={() => handleAddToCart('rent')}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Sewa Sekarang
                    </Button>
                  </TabsContent>
                )}

                {product.canBuy && (
                  <TabsContent value="buy" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity-buy">Jumlah</Label>
                      <Input
                        id="quantity-buy"
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                        className="max-w-[120px]"
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Total Harga</p>
                      <p className="text-2xl font-bold text-primary">
                        Rp {buyTotal.toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {quantity} unit × Rp {product.buyPrice.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      variant="hero"
                      onClick={() => handleAddToCart('buy')}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Beli Sekarang
                    </Button>
                  </TabsContent>
                )}
              </Tabs>

              {/* Specifications */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Spesifikasi Produk</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
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

export default ProductDetail;
