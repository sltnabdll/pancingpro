import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Joran Shimano FX XT',
    category: 'joran',
    rentalPrice: 50000,
    buyPrice: 450000,
    stock: 5,
    description: 'Joran berkualitas tinggi dari Shimano seri FX XT dengan performa luar biasa untuk pemula hingga profesional.',
    specifications: [
      'Panjang: 210cm',
      'Material: Carbon Composite',
      'Action: Medium Fast',
      'Lure Weight: 7-21g',
      'Line Weight: 6-12lb'
    ],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '2',
    name: 'Joran Daiwa Minispin',
    category: 'joran',
    rentalPrice: 40000,
    buyPrice: 380000,
    stock: 8,
    description: 'Joran compact dari Daiwa yang sempurna untuk mancing di area terbatas dengan sensitivitas tinggi.',
    specifications: [
      'Panjang: 180cm',
      'Material: Graphite',
      'Action: Medium',
      'Lure Weight: 5-18g',
      'Line Weight: 4-10lb'
    ],
    image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '3',
    name: 'Joran Maguro Avengers',
    category: 'joran',
    rentalPrice: 35000,
    buyPrice: 320000,
    stock: 10,
    description: 'Joran tangguh dari Maguro dengan daya tahan tinggi, cocok untuk berbagai jenis ikan.',
    specifications: [
      'Panjang: 240cm',
      'Material: Carbon Mix',
      'Action: Fast',
      'Lure Weight: 10-28g',
      'Line Weight: 8-16lb'
    ],
    image: 'https://images.unsplash.com/photo-1515444744559-7be63e1600de?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '4',
    name: 'Reel Shimano Sienna 2500',
    category: 'reel',
    rentalPrice: 45000,
    buyPrice: 520000,
    stock: 6,
    description: 'Reel spinning premium dengan sistem drag yang smooth dan daya tahan luar biasa.',
    specifications: [
      'Gear Ratio: 5.0:1',
      'Weight: 280g',
      'Ball Bearings: 4+1',
      'Line Capacity: 0.25mm/240m',
      'Drag Max: 4kg'
    ],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '5',
    name: 'Reel Daiwa Revros LT',
    category: 'reel',
    rentalPrice: 50000,
    buyPrice: 580000,
    stock: 4,
    description: 'Reel teknologi Light & Tough dengan body ringan namun kekuatan maksimal.',
    specifications: [
      'Gear Ratio: 5.2:1',
      'Weight: 230g',
      'Ball Bearings: 5+1',
      'Line Capacity: 0.23mm/200m',
      'Drag Max: 5kg'
    ],
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '6',
    name: 'Reel Maguro Extreme',
    category: 'reel',
    rentalPrice: 30000,
    buyPrice: 280000,
    stock: 7,
    description: 'Reel dengan performa solid dan harga terjangkau, ideal untuk pemula.',
    specifications: [
      'Gear Ratio: 5.1:1',
      'Weight: 310g',
      'Ball Bearings: 3+1',
      'Line Capacity: 0.28mm/240m',
      'Drag Max: 3.5kg'
    ],
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '7',
    name: 'Umpan Rapala Minnow',
    category: 'umpan',
    buyPrice: 85000,
    stock: 20,
    description: 'Umpan hard bait premium dengan aksi berenang natural yang sangat menarik perhatian ikan predator.',
    specifications: [
      'Panjang: 7cm',
      'Berat: 8g',
      'Type: Floating',
      'Target: Bass, Pike, Snook',
      'Action: Swimming'
    ],
    image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=500&h=500&fit=crop',
    canRent: false,
    canBuy: true
  },
  {
    id: '8',
    name: 'Senar PE Shimano 0.8',
    category: 'aksesoris',
    buyPrice: 120000,
    stock: 15,
    description: 'Senar PE berkualitas tinggi dengan kekuatan dan daya tahan optimal untuk segala kondisi.',
    specifications: [
      'Diameter: 0.8',
      'Breaking Strength: 12lb',
      'Length: 150m',
      'Material: PE',
      '4-strand braided'
    ],
    image: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=500&h=500&fit=crop',
    canRent: false,
    canBuy: true
  },
  {
    id: '9',
    name: 'Kail Pancing Owner (1 box)',
    category: 'aksesoris',
    buyPrice: 45000,
    stock: 30,
    description: 'Set kail premium dari Owner dengan berbagai ukuran untuk berbagai jenis ikan.',
    specifications: [
      'Sizes: #4, #6, #8, #10',
      'Material: High Carbon Steel',
      'Quantity: 25 pcs per box',
      'Finish: Black Chrome',
      'Sharp Point Technology'
    ],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=500&fit=crop',
    canRent: false,
    canBuy: true
  },
  {
    id: '10',
    name: 'Tackle Box Waterproof',
    category: 'aksesoris',
    rentalPrice: 25000,
    buyPrice: 180000,
    stock: 12,
    description: 'Kotak tackle anti air dengan kompartemen adjustable, cocok untuk menyimpan berbagai perlengkapan.',
    specifications: [
      'Dimensions: 28x18x6cm',
      'Material: ABS Plastic',
      'Waterproof Rating: IPX5',
      'Compartments: 12 adjustable',
      'Lockable latches'
    ],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '11',
    name: 'Tas Pancing Selempang',
    category: 'aksesoris',
    rentalPrice: 20000,
    buyPrice: 150000,
    stock: 10,
    description: 'Tas selempang multifungsi dengan banyak kantong untuk membawa perlengkapan pancing dengan nyaman.',
    specifications: [
      'Dimensions: 30x20x15cm',
      'Material: Oxford 600D',
      'Pockets: 8 external + 3 internal',
      'Water-resistant',
      'Adjustable shoulder strap'
    ],
    image: 'https://images.unsplash.com/photo-1505235687559-28b5f54645b7?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  },
  {
    id: '12',
    name: 'Cooler Box 25L',
    category: 'aksesoris',
    rentalPrice: 30000,
    buyPrice: 350000,
    stock: 5,
    description: 'Cooler box berkapasitas 25L dengan insulasi terbaik untuk menjaga kesegaran ikan hasil tangkapan.',
    specifications: [
      'Capacity: 25 Liters',
      'Ice Retention: up to 3 days',
      'Material: Rotomolded',
      'Dimension: 55x30x35cm',
      'Weight: 6kg'
    ],
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&h=500&fit=crop',
    canRent: true,
    canBuy: true
  }
];
