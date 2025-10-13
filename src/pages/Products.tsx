import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilter } from '@/components/ProductFilter';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const { items } = useCart();
  const { data: products = [], isLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const typeMatch = 
      selectedType === 'all' ||
      (selectedType === 'rent' && product.canRent) ||
      (selectedType === 'buy' && product.canBuy);
    
    return categoryMatch && typeMatch;
  });

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Katalog Produk</h1>
            <p className="text-muted-foreground">
              Temukan peralatan pancing yang tepat untuk kebutuhan Anda
            </p>
          </div>

          <ProductFilter
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onCategoryChange={setSelectedCategory}
            onTypeChange={setSelectedType}
          />

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-xl text-muted-foreground">
                Tidak ada produk yang sesuai dengan filter Anda
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground animate-fade-in">
                Menampilkan {filteredProducts.length} produk
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
