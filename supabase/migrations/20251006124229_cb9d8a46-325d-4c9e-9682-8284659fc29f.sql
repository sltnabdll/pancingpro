-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  rental_price DECIMAL(10,2),
  buy_price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  specifications JSONB,
  is_rental_available BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('rent', 'buy')),
  rental_days INTEGER,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read access)
CREATE POLICY "Anyone can view products"
  ON public.products
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert products"
  ON public.products
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Only admins can update products"
  ON public.products
  FOR UPDATE
  USING (false);

-- RLS Policies for orders (anyone can create, only owner can view)
CREATE POLICY "Anyone can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  USING (
    user_id = auth.uid() OR user_id IS NULL
  );

-- RLS Policies for order_items
CREATE POLICY "Anyone can create order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their order items"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial products data
INSERT INTO public.products (name, category, image, description, rental_price, buy_price, stock, is_rental_available, specifications) VALUES
('Joran Shimano FX XT', 'Joran', 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=500&h=500&fit=crop', 'Joran berkualitas tinggi untuk pemancing profesional', 50000, 450000, 15, true, '{"length": "2.1m", "weight": "180g", "sections": "2", "line_weight": "8-16lb"}'),
('Joran Daiwa Minispin', 'Joran', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=500&fit=crop', 'Joran portable ideal untuk traveling', 40000, 380000, 12, true, '{"length": "1.8m", "weight": "150g", "sections": "5", "line_weight": "6-12lb"}'),
('Joran Maguro Avengers', 'Joran', 'https://images.unsplash.com/photo-1534943441045-a530bc2a9d86?w=500&h=500&fit=crop', 'Joran entry level dengan performa maksimal', 35000, 320000, 20, true, '{"length": "2.4m", "weight": "200g", "sections": "2", "line_weight": "10-20lb"}'),
('Reel Shimano Sienna 2500', 'Reel', 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=500&h=500&fit=crop', 'Reel smooth dengan drag system terbaik', 45000, 520000, 10, true, '{"gear_ratio": "5.0:1", "weight": "250g", "bearing": "3BB", "line_capacity": "6lb/200m"}'),
('Reel Daiwa Revros LT', 'Reel', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=500&fit=crop', 'Reel ringan dengan teknologi LT terbaru', 50000, 580000, 8, true, '{"gear_ratio": "5.2:1", "weight": "220g", "bearing": "5BB", "line_capacity": "8lb/150m"}'),
('Reel Maguro Extreme', 'Reel', 'https://images.unsplash.com/photo-1534943441045-a530bc2a9d86?w=500&h=500&fit=crop', 'Reel powerful untuk ikan besar', 30000, 280000, 15, true, '{"gear_ratio": "4.7:1", "weight": "280g", "bearing": "2BB", "line_capacity": "10lb/200m"}'),
('Umpan Rapala Minnow', 'Umpan', 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=500&h=500&fit=crop', 'Umpan buatan berkualitas tinggi', NULL, 85000, 50, false, '{"length": "7cm", "weight": "8g", "type": "Floating", "color": "Silver"}'),
('Senar PE Shimano 0.8', 'Aksesoris', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=500&fit=crop', 'Senar PE premium anti kusut', NULL, 120000, 30, false, '{"diameter": "0.8", "strength": "18lb", "length": "150m", "color": "Green"}'),
('Kail Pancing Owner (1 box)', 'Aksesoris', 'https://images.unsplash.com/photo-1534943441045-a530bc2a9d86?w=500&h=500&fit=crop', 'Set kail berbagai ukuran', NULL, 45000, 100, false, '{"sizes": "6-12", "quantity": "50pcs", "material": "Carbon Steel"}'),
('Tackle Box Waterproof', 'Aksesoris', 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=500&h=500&fit=crop', 'Box penyimpanan peralatan anti air', 25000, 180000, 25, true, '{"size": "30x20x15cm", "compartments": "12", "material": "ABS Plastic"}'),
('Tas Pancing Selempang', 'Aksesoris', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=500&fit=crop', 'Tas praktis untuk mancing', 20000, 150000, 30, true, '{"capacity": "15L", "pockets": "5", "material": "Nylon Waterproof"}'),
('Cooler Box 25L', 'Aksesoris', 'https://images.unsplash.com/photo-1534943441045-a530bc2a9d86?w=500&h=500&fit=crop', 'Cooler box untuk menyimpan hasil tangkapan', 30000, 350000, 10, true, '{"capacity": "25L", "ice_retention": "48hrs", "material": "Polyurethane"}');