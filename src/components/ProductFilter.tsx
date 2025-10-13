import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface ProductFilterProps {
  selectedCategory: string;
  selectedType: string;
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: string) => void;
}

export const ProductFilter = ({
  selectedCategory,
  selectedType,
  onCategoryChange,
  onTypeChange
}: ProductFilterProps) => {
  return (
    <div className="bg-card border rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Filter Produk</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Kategori</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="joran">Joran</SelectItem>
              <SelectItem value="reel">Reel</SelectItem>
              <SelectItem value="umpan">Umpan</SelectItem>
              <SelectItem value="aksesoris">Aksesoris</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tipe Transaksi</label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="rent">Bisa Disewa</SelectItem>
              <SelectItem value="buy">Bisa Dibeli</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              onCategoryChange('all');
              onTypeChange('all');
            }}
          >
            Reset Filter
          </Button>
        </div>
      </div>
    </div>
  );
};
