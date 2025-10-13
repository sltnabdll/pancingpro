import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 animate-scale-in">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.stock < 5 && (
            <Badge className="absolute top-2 right-2 bg-destructive">
              Stok Terbatas!
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2 capitalize">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="space-y-1">
          {product.canRent && product.rentalPrice && (
            <p className="text-sm">
              <span className="text-muted-foreground">Sewa:</span>{' '}
              <span className="font-semibold text-secondary">
                Rp {product.rentalPrice.toLocaleString('id-ID')}/hari
              </span>
            </p>
          )}
          {product.canBuy && (
            <p className="text-sm">
              <span className="text-muted-foreground">Beli:</span>{' '}
              <span className="font-semibold text-primary">
                Rp {product.buyPrice.toLocaleString('id-ID')}
              </span>
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button variant="hero" className="w-full">
            Lihat Detail
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
