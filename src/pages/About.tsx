import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/hooks/useCart';
import { Card, CardContent } from '@/components/ui/card';
import { Fish, Award, Users, MapPin } from 'lucide-react';

const About = () => {
  const { items } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={items.length} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-ocean-gradient text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center animate-fade-in">
            <Fish className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Alat Pancing Pro</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Mitra terpercaya Anda dalam dunia memancing sejak 2020
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="animate-scale-in">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    Misi Kami
                  </h2>
                  <p className="text-muted-foreground">
                    Menyediakan peralatan pancing berkualitas tinggi dengan harga terjangkau, 
                    memberikan solusi fleksibel melalui layanan sewa dan beli, serta mendukung 
                    komunitas pemancing dari pemula hingga profesional.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6 text-secondary" />
                    Visi Kami
                  </h2>
                  <p className="text-muted-foreground">
                    Menjadi platform terdepan dalam industri peralatan pancing di Indonesia, 
                    dikenal karena kualitas produk, layanan pelanggan yang excellent, dan 
                    kontribusi positif terhadap komunitas pemancing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
              Mengapa Memilih Kami?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-3 animate-slide-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-gradient mb-2">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">Produk Original</h3>
                <p className="text-sm text-muted-foreground">
                  Semua produk kami dijamin 100% original dari brand terpercaya seperti 
                  Shimano, Daiwa, dan Maguro.
                </p>
              </div>

              <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-gradient mb-2">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">Layanan Pelanggan</h3>
                <p className="text-sm text-muted-foreground">
                  Tim kami siap membantu Anda memilih peralatan yang tepat sesuai kebutuhan 
                  dan tingkat keahlian.
                </p>
              </div>

              <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean-gradient mb-2">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">Lokasi Strategis</h3>
                <p className="text-sm text-muted-foreground">
                  Berlokasi di Jakarta Utara, dekat dengan berbagai spot mancing populer 
                  untuk kemudahan akses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-center mb-8">Cerita Kami</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Alat Pancing Pro didirikan pada tahun 2020 oleh sekelompok penggemar memancing 
                  yang memiliki visi untuk membuat hobi memancing lebih accessible bagi semua orang. 
                  Kami memahami bahwa peralatan pancing berkualitas bisa menjadi investasi yang besar, 
                  terutama bagi pemula yang baru ingin mencoba hobi ini.
                </p>
                <p>
                  Oleh karena itu, kami menghadirkan konsep unik: menyewakan peralatan pancing 
                  berkualitas tinggi dengan harga terjangkau, sambil tetap menyediakan opsi pembelian 
                  bagi mereka yang ingin memiliki peralatan sendiri.
                </p>
                <p>
                  Dalam perjalanan kami, kami telah melayani ribuan pelanggan, dari pemancing pemula 
                  yang ingin mencoba hobi baru, hingga profesional yang mencari upgrade untuk peralatan 
                  mereka. Kepercayaan dan kepuasan pelanggan adalah prioritas utama kami.
                </p>
                <p>
                  Kami terus berkembang dan berkomitmen untuk menjadi mitra terbaik Anda dalam 
                  perjalanan memancing, memberikan tidak hanya peralatan berkualitas, tetapi juga 
                  pengetahuan dan dukungan yang Anda butuhkan untuk sukses di air.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
