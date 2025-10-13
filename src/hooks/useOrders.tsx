import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/product';

interface CreateOrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  notes?: string;
  paymentProof: File;
  items: CartItem[];
  total: number;
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Upload payment proof
      const fileExt = orderData.paymentProof.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, orderData.paymentProof);

      if (uploadError) throw uploadError;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          customer_name: orderData.name,
          customer_email: orderData.email,
          customer_phone: orderData.phone,
          customer_address: orderData.address,
          payment_method: orderData.paymentMethod,
          payment_proof_name: fileName,
          notes: orderData.notes,
          total_amount: orderData.total,
          status: 'payment_submitted'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.image,
        quantity: item.quantity,
        unit_price: item.type === 'rent' && item.product.rentalPrice && item.rentalDays
          ? item.product.rentalPrice * item.rentalDays
          : item.product.buyPrice,
        item_type: item.type,
        rental_days: item.type === 'rent' ? item.rentalDays : null,
        subtotal: item.type === 'rent' && item.product.rentalPrice && item.rentalDays
          ? item.product.rentalPrice * item.rentalDays * item.quantity
          : item.product.buyPrice * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    }
  });
};

export const useUserOrders = () => {
  return useQuery({
    queryKey: ['user-orders'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
};
