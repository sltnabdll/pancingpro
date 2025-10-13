import { Fish, Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Fish className="h-8 w-8" />
              <div>
                <h3 className="font-bold text-lg">Alat Pancing Pro</h3>
                <p className="text-sm opacity-90">Solusi Mancing Terlengkap</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Dari pemula hingga profesional, kami menyediakan peralatan pancing berkualitas dengan harga terjangkau.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="opacity-80 hover:opacity-100 transition-opacity">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/cart" className="opacity-80 hover:opacity-100 transition-opacity">
                  Keranjang
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">Parepare</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-80">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-80">info@pancingpro.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a href="#" className="hover:scale-110 transition-transform">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 Alat Pancing Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
