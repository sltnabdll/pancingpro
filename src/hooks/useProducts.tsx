import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database products to match our Product type
      return data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        description: product.description,
        rentalPrice: product.rental_price ? Number(product.rental_price) : undefined,
        buyPrice: Number(product.buy_price),
        stock: product.stock,
        canRent: product.is_rental_available,
        canBuy: true,
        specifications: product.specifications ? 
          Object.values(product.specifications).map(val => String(val)) : 
          []
      })) as Product[];
    }
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        name: data.name,
        category: data.category,
        image: data.image,
        description: data.description,
        rentalPrice: data.rental_price ? Number(data.rental_price) : undefined,
        buyPrice: Number(data.buy_price),
        stock: data.stock,
        canRent: data.is_rental_available,
        canBuy: true,
        specifications: data.specifications ? 
          Object.values(data.specifications).map(val => String(val)) : 
          []
      } as Product;
    },
    enabled: !!id
  });
};
