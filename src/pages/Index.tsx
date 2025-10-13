import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import heroImage from '@/assets/hero-fishing.jpg';
import { Package, ShieldCheck, Clock, Headphones } from 'lucide-react';

const Index = () => {
  const { items } = useCart();
  const { data: products = [] } = useProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Selamat Datang di Alat Pancing Pro
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Dari Pemula Hingga Profesional, Solusi Mancing Terlengkap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Lihat Semua Produk
              </Button>
            </Link>
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-3 animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-gradient">
                <Package className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Produk Lengkap</h3>
              <p className="text-sm text-muted-foreground">
                Berbagai pilihan alat pancing berkualitas
              </p>
            </div>
            
            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-gradient">
                <ShieldCheck className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Kualitas Terjamin</h3>
              <p className="text-sm text-muted-foreground">
                Produk original dari brand terpercaya
              </p>
            </div>
            
            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-gradient">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Sewa & Beli</h3>
              <p className="text-sm text-muted-foreground">
                Fleksibilitas untuk sewa atau beli langsung
              </p>
            </div>
            
            <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-gradient">
                <Headphones className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg">Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                Tim support siap membantu Anda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produk Unggulan</h2>
            <p className="text-lg text-muted-foreground">
              Pilihan terbaik untuk kebutuhan mancing Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button variant="hero" size="lg">
                Lihat Semua Produk
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
