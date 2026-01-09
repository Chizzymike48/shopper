// src/data/products.js

export const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics', icon: '📱' },
  { id: 2, name: 'Clothing', slug: 'clothing', icon: '👕' },
  { id: 3, name: 'Home & Garden', slug: 'home-garden', icon: '🏡' },
  { id: 4, name: 'Sports', slug: 'sports', icon: '⚽' },
  { id: 5, name: 'Books', slug: 'books', icon: '📚' },
  { id: 6, name: 'Toys', slug: 'toys', icon: '🧸' },
];

export const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 129.99,
    compareAtPrice: 199.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    ],
    stock: 45,
    rating: 4.5,
    reviews: 128,
    tags: ['electronics', 'audio', 'wireless'],
    featured: true,
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '1 year',
    }
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-tshirt',
    description: 'Comfortable 100% organic cotton t-shirt in multiple colors',
    price: 29.99,
    compareAtPrice: null,
    category: 'clothing',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    ],
    stock: 120,
    rating: 4.8,
    reviews: 89,
    tags: ['clothing', 'organic', 'casual'],
    featured: true,
    variants: [
      { id: 'v1', size: 'S', color: 'White', stock: 30 },
      { id: 'v2', size: 'M', color: 'White', stock: 40 },
      { id: 'v3', size: 'L', color: 'Black', stock: 50 },
    ],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular',
      'Care': 'Machine wash cold',
    }
  },
  {
    id: 3,
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    compareAtPrice: 399.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    ],
    stock: 32,
    rating: 4.6,
    reviews: 203,
    tags: ['electronics', 'fitness', 'smart'],
    featured: true,
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': '5ATM',
      'GPS': 'Built-in',
    }
  },
  {
    id: 4,
    name: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    description: 'Extra thick non-slip yoga mat with carrying strap',
    price: 49.99,
    compareAtPrice: null,
    category: 'sports',
    categoryId: 4,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    ],
    stock: 67,
    rating: 4.7,
    reviews: 156,
    tags: ['sports', 'yoga', 'fitness'],
    featured: false,
    specifications: {
      'Thickness': '8mm',
      'Material': 'TPE',
      'Size': '183cm x 61cm',
    }
  },
  {
    id: 5,
    name: 'Coffee Maker Deluxe',
    slug: 'coffee-maker-deluxe',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    compareAtPrice: 129.99,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    ],
    stock: 23,
    rating: 4.4,
    reviews: 92,
    tags: ['home', 'kitchen', 'appliances'],
    featured: false,
    specifications: {
      'Capacity': '12 cups',
      'Features': 'Programmable, Auto shut-off',
      'Warranty': '2 years',
    }
  },
  {
    id: 6,
    name: 'Running Shoes Ultra',
    slug: 'running-shoes-ultra',
    description: 'Lightweight running shoes with responsive cushioning',
    price: 119.99,
    compareAtPrice: null,
    category: 'sports',
    categoryId: 4,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
    ],
    stock: 88,
    rating: 4.9,
    reviews: 312,
    tags: ['sports', 'shoes', 'running'],
    featured: true,
    variants: [
      { id: 's1', size: '8', color: 'Black', stock: 20 },
      { id: 's2', size: '9', color: 'Black', stock: 28 },
      { id: 's3', size: '10', color: 'White', stock: 40 },
    ],
    specifications: {
      'Weight': '240g',
      'Drop': '10mm',
      'Surface': 'Road',
    }
  },
  {
    id: 7,
    name: 'Bestseller Novel Collection',
    slug: 'bestseller-novel-collection',
    description: 'Set of 3 award-winning contemporary novels',
    price: 45.99,
    compareAtPrice: 59.99,
    category: 'books',
    categoryId: 5,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    ],
    stock: 150,
    rating: 4.8,
    reviews: 245,
    tags: ['books', 'fiction', 'bestseller'],
    featured: false,
    specifications: {
      'Format': 'Paperback',
      'Pages': '~300 each',
      'Language': 'English',
    }
  },
  {
    id: 8,
    name: 'Mechanical Keyboard RGB',
    slug: 'mechanical-keyboard-rgb',
    description: 'Gaming mechanical keyboard with customizable RGB lighting',
    price: 159.99,
    compareAtPrice: 199.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
    ],
    stock: 41,
    rating: 4.7,
    reviews: 178,
    tags: ['electronics', 'gaming', 'peripherals'],
    featured: true,
    specifications: {
      'Switch Type': 'Mechanical Blue',
      'Backlight': 'RGB',
      'Connection': 'USB-C',
    }
  },
  {
    id: 9,
    name: 'E-Reader Light',
    slug: 'e-reader-light',
    description: '6-inch e-ink display with adjustable warm light and 8GB storage',
    price: 99.99,
    compareAtPrice: 129.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500'
    ],
    stock: 210,
    rating: 4.5,
    reviews: 74,
    tags: ['electronics', 'books', 'reading'],
    featured: false,
    specifications: {
      'Display': '6" E-Ink',
      'Storage': '8GB',
      'Battery': 'Weeks',
    }
  },
  {
    id: 10,
    name: 'High-Speed Blender',
    slug: 'high-speed-blender',
    description: 'Powerful blender for smoothies and soups with pulse function',
    price: 69.99,
    compareAtPrice: 99.99,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1586201375759-8f3b8b3b2b1d?w=500'
    ],
    stock: 54,
    rating: 4.3,
    reviews: 48,
    tags: ['kitchen', 'appliances', 'home'],
    featured: false,
    specifications: {
      'Power': '900W',
      'Capacity': '1.5L',
      'Material': 'BPA-free',
    }
  },
  {
    id: 11,
    name: 'Kids Building Blocks Set',
    slug: 'kids-building-blocks-set',
    description: '200-piece building blocks set for ages 3+',
    price: 24.99,
    compareAtPrice: null,
    category: 'toys',
    categoryId: 6,
    images: [
      'https://images.unsplash.com/photo-1587461805531-7b7d5b8b6f2a?w=500'
    ],
    stock: 320,
    rating: 4.6,
    reviews: 64,
    tags: ['toys', 'kids', 'education'],
    featured: false,
    specifications: {
      'Pieces': '200',
      'Age': '3+',
      'Material': 'ABS Plastic',
    }
  },
  {
    id: 12,
    name: 'Urban Daypack Backpack',
    slug: 'urban-daypack-backpack',
    description: 'Water-resistant daypack with laptop sleeve and ergonomic straps',
    price: 59.99,
    compareAtPrice: 79.99,
    category: 'clothing',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    ],
    stock: 76,
    rating: 4.4,
    reviews: 34,
    tags: ['clothing', 'bags', 'travel'],
    featured: false,
    specifications: {
      'Capacity': '20L',
      'Laptop Sleeve': '15-inch',
      'Material': 'Ripstop Nylon',
    }
  },
  {
    id: 13,
    name: 'Fast Wireless Charger Pad',
    slug: 'fast-wireless-charger-pad',
    description: '15W Qi-certified wireless charging pad with LED indicator',
    price: 29.99,
    compareAtPrice: null,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    ],
    stock: 140,
    rating: 4.2,
    reviews: 56,
    tags: ['electronics', 'accessories', 'charging'],
    featured: false,
    specifications: {
      'Output': '15W',
      'Compatibility': 'Qi devices',
      'Cable': 'USB-C included',
    }
  },
  {
    id: 14,
    name: 'Mirrorless Camera 24MP',
    slug: 'mirrorless-camera-24mp',
    description: 'Compact mirrorless camera with 24MP sensor and interchangeable lens',
    price: 699.99,
    compareAtPrice: 899.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    ],
    stock: 15,
    rating: 4.6,
    reviews: 22,
    tags: ['electronics', 'camera', 'photography'],
    featured: true,
    specifications: {
      'Sensor': '24MP APS-C',
      'Video': '4K30',
      'ISO': '100-51200',
    }
  },
  {
    id: 15,
    name: 'Insulated Stainless Bottle 1L',
    slug: 'insulated-stainless-bottle-1l',
    description: 'Keeps drinks hot for 12h or cold for 24h, leak-proof cap',
    price: 22.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=500'
    ],
    stock: 260,
    rating: 4.7,
    reviews: 103,
    tags: ['home', 'outdoors', 'bottle'],
    featured: false,
    specifications: {
      'Capacity': '1L',
      'Material': 'Stainless Steel',
      'Insulation': 'Double-wall',
    }
  },
  {
    id: 16,
    name: 'Down Winter Jacket',
    slug: 'down-winter-jacket',
    description: 'Lightweight down jacket with water-repellent shell',
    price: 139.99,
    compareAtPrice: 199.99,
    category: 'clothing',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500'
    ],
    stock: 48,
    rating: 4.5,
    reviews: 87,
    tags: ['clothing', 'outerwear', 'winter'],
    featured: true,
    variants: [
      { id: 'j1', size: 'M', color: 'Navy', stock: 20 },
      { id: 'j2', size: 'L', color: 'Black', stock: 15 },
    ],
    specifications: {
      'Fill': '700-fill down',
      'Shell': 'DWR coated',
      'Care': 'Machine wash cold',
    }
  },
  {
    id: 17,
    name: 'Ceramic Plant Pot Set',
    slug: 'ceramic-plant-pot-set',
    description: 'Set of 3 decorative ceramic pots for indoor plants',
    price: 34.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1524594154907-6a8b2b2b3b9f?w=500'
    ],
    stock: 95,
    rating: 4.6,
    reviews: 19,
    tags: ['home', 'decor', 'plants'],
    featured: false,
    specifications: {
      'Sizes': 'Small/Medium/Large',
      'Material': 'Ceramic',
      'Drainage': 'Included',
    }
  },
  {
    id: 18,
    name: 'Precision Gaming Mouse',
    slug: 'precision-gaming-mouse',
    description: 'Ergonomic gaming mouse with adjustable DPI and RGB',
    price: 49.99,
    compareAtPrice: 69.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
    ],
    stock: 134,
    rating: 4.4,
    reviews: 210,
    tags: ['electronics', 'gaming', 'peripherals'],
    featured: true,
    specifications: {
      'DPI': '200-16000',
      'Sensor': 'Optical',
      'Connection': 'Wired',
    }
  },
  {
    id: 19,
    name: 'Noise-Isolating Earbuds',
    slug: 'noise-isolating-earbuds',
    description: 'In-ear earbuds with silicone tips and passive noise isolation',
    price: 19.99,
    compareAtPrice: null,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500'
    ],
    stock: 400,
    rating: 4.1,
    reviews: 58,
    tags: ['electronics', 'audio', 'earbuds'],
    featured: false,
    specifications: {
      'Connection': '3.5mm / Adapter',
      'Tips': 'Silicone (3 sizes)',
    }
  },
  {
    id: 20,
    name: 'Classic Journal Notebook',
    slug: 'classic-journal-notebook',
    description: 'Hardcover A5 notebook with dotted pages',
    price: 12.99,
    compareAtPrice: null,
    category: 'books',
    categoryId: 5,
    images: [
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500'
    ],
    stock: 520,
    rating: 4.9,
    reviews: 412,
    tags: ['books', 'stationery', 'journal'],
    featured: false,
    specifications: {
      'Size': 'A5',
      'Pages': 192,
      'Paper': '120gsm',
    }
  },
  {
    id: 21,
    name: 'Smart LED Desk Lamp',
    slug: 'smart-led-desk-lamp',
    description: 'Adjustable brightness and color temperature with touch controls',
    price: 39.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1582719478250-1b6b01b9f3d0?w=500'
    ],
    stock: 140,
    rating: 4.4,
    reviews: 67,
    tags: ['home', 'lighting', 'smart'],
    featured: false,
    specifications: {
      'Power': '8W',
      'Color Temp': '2700K-6500K',
    }
  },
  {
    id: 22,
    name: 'Trail Runner Backpack 30L',
    slug: 'trail-runner-backpack-30l',
    description: 'Lightweight hydration pack with multiple pockets',
    price: 74.99,
    compareAtPrice: 99.99,
    category: 'sports',
    categoryId: 4,
    images: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500'
    ],
    stock: 62,
    rating: 4.5,
    reviews: 41,
    tags: ['sports', 'outdoors', 'backpack'],
    featured: false,
    specifications: {
      'Capacity': '30L',
      'Material': 'Ripstop Nylon',
    }
  },
  {
    id: 23,
    name: 'Wireless Home Security Camera',
    slug: 'wireless-home-security-camera',
    description: '1080p camera with night vision and two-way audio',
    price: 59.99,
    compareAtPrice: 89.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500'
    ],
    stock: 85,
    rating: 4.2,
    reviews: 29,
    tags: ['electronics', 'security', 'home'],
    featured: true,
    specifications: {
      'Resolution': '1080p',
      'Night Vision': 'IR LEDs',
    }
  },
  {
    id: 24,
    name: 'Vintage Leather Wallet',
    slug: 'vintage-leather-wallet',
    description: 'Hand-stitched genuine leather bifold wallet',
    price: 34.99,
    compareAtPrice: null,
    category: 'clothing',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1520975698514-0f9f7e8fb5b3?w=500'
    ],
    stock: 200,
    rating: 4.6,
    reviews: 88,
    tags: ['clothing', 'accessories', 'leather'],
    featured: false,
    specifications: {
      'Material': 'Genuine Leather',
      'Slots': 8,
    }
  },
  {
    id: 25,
    name: 'Kids Plush Dino Toy',
    slug: 'kids-plush-dino-toy',
    description: 'Soft and cuddly dinosaur plush for toddlers',
    price: 14.99,
    compareAtPrice: null,
    category: 'toys',
    categoryId: 6,
    images: [
      'https://images.unsplash.com/photo-1542060748-1b6a2fdf8a2a?w=500'
    ],
    stock: 320,
    rating: 4.8,
    reviews: 123,
    tags: ['toys', 'kids', 'plush'],
    featured: false,
    specifications: {
      'Size': '30cm',
      'Care': 'Surface wash',
    }
  },
  {
    id: 26,
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Compact speaker with rich bass and 12-hour battery',
    price: 49.99,
    compareAtPrice: 69.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    ],
    stock: 150,
    rating: 4.3,
    reviews: 76,
    tags: ['electronics', 'audio', 'portable'],
    featured: true,
    specifications: {
      'Battery': '12 hours',
      'Bluetooth': '5.0',
    }
  },
  {
    id: 27,
    name: 'Kids STEM Robot Kit',
    slug: 'kids-stem-robot-kit',
    description: 'Educational robot kit for ages 8+ with coding activities',
    price: 59.99,
    compareAtPrice: 79.99,
    category: 'toys',
    categoryId: 6,
    images: [
      'https://images.unsplash.com/photo-1581093588401-8f1b1a5d1f4f?w=500'
    ],
    stock: 98,
    rating: 4.7,
    reviews: 54,
    tags: ['toys', 'education', 'robotics'],
    featured: false,
    specifications: {
      'Includes': 'Sensors, Motors, Controller',
      'Age': '8+',
    }
  },
  {
    id: 28,
    name: 'Stainless Cutlery Set 16pc',
    slug: 'stainless-cutlery-set-16pc',
    description: 'Durable stainless steel flatware set for 4',
    price: 39.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500'
    ],
    stock: 180,
    rating: 4.5,
    reviews: 34,
    tags: ['home', 'kitchen', 'dining'],
    featured: false,
    specifications: {
      'Pieces': 16,
      'Material': '18/10 Stainless Steel',
    }
  },
  {
    id: 29,
    name: 'Compression Running Socks',
    slug: 'compression-running-socks',
    description: 'Breathable socks with graduated compression for recovery',
    price: 12.99,
    compareAtPrice: null,
    category: 'clothing',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1520975698514-0f9f7e8fb5b3?w=500'
    ],
    stock: 240,
    rating: 4.6,
    reviews: 77,
    tags: ['clothing', 'socks', 'running'],
    featured: false,
    specifications: {
      'Material': 'Nylon/Spandex',
      'Sizes': 'S/M/L',
    }
  },
  {
    id: 30,
    name: 'Wireless Ergonomic Mouse',
    slug: 'wireless-ergonomic-mouse',
    description: 'Ergonomic design with programmable buttons and long battery life',
    price: 44.99,
    compareAtPrice: 59.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
    ],
    stock: 132,
    rating: 4.4,
    reviews: 98,
    tags: ['electronics', 'accessories', 'mouse'],
    featured: true,
    specifications: {
      'DPI': '100-12000',
      'Connection': 'Wireless',
    }
  },
  {
    id: 31,
    name: 'Ceramic Coffee Mug Set',
    slug: 'ceramic-coffee-mug-set',
    description: 'Set of 4 mugs with glazed finish, dishwasher safe',
    price: 24.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500'
    ],
    stock: 210,
    rating: 4.7,
    reviews: 66,
    tags: ['home', 'kitchen', 'mugs'],
    featured: false,
    specifications: {
      'Capacity': '350ml',
      'Material': 'Ceramic',
    }
  },
  {
    id: 32,
    name: 'Smartphone Gimbal Stabilizer',
    slug: 'smartphone-gimbal-stabilizer',
    description: '3-axis gimbal for smooth video capture and timelapse',
    price: 129.99,
    compareAtPrice: 169.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1512446816047-2f1a4d3a0e1b?w=500'
    ],
    stock: 48,
    rating: 4.3,
    reviews: 27,
    tags: ['electronics', 'camera', 'accessories'],
    featured: false,
    specifications: {
      'Battery': '12 hours',
      'Axis': '3-axis',
    }
  },
  {
    id: 33,
    name: 'Organic Herb Growing Kit',
    slug: 'organic-herb-growing-kit',
    description: 'Indoor kit with soil pods and seeds for basil, cilantro, and parsley',
    price: 29.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=500'
    ],
    stock: 115,
    rating: 4.6,
    reviews: 39,
    tags: ['home', 'garden', 'plants'],
    featured: false,
    specifications: {
      'Includes': 'Soil pods, Seeds, Guide',
      'Difficulty': 'Easy',
    }
  },
  {
    id: 34,
    name: 'Men\'s Classic Oxford Shirt',
    slug: 'mens-classic-oxford-shirt',
    description: 'Durable cotton oxford shirt with tailored fit',
    price: 39.99,
    compareAtPrice: 59.99,
    category: 'clothing',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1520975698514-0f9f7e8fb5b3?w=500'
    ],
    stock: 88,
    rating: 4.5,
    reviews: 120,
    tags: ['clothing', 'men', 'shirts'],
    featured: true,
    variants: [
      { id: 'ox1', size: 'M', color: 'White', stock: 30 },
      { id: 'ox2', size: 'L', color: 'Blue', stock: 20 },
    ],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Tailored',
    }
  },
  {
    id: 35,
    name: 'Adjustable Dumbbell Set (2x20lb)',
    slug: 'adjustable-dumbbell-set-20lb',
    description: 'Space-saving adjustable dumbbells for home workouts',
    price: 199.99,
    compareAtPrice: 249.99,
    category: 'sports',
    categoryId: 4,
    images: [
      'https://images.unsplash.com/photo-1599058917217-2a9b0d4f1f0a?w=500'
    ],
    stock: 26,
    rating: 4.6,
    reviews: 58,
    tags: ['sports', 'fitness', 'gym'],
    featured: true,
    specifications: {
      'Weight Range': '5-20lb each',
      'Material': 'Steel/Plastic',
    }
  },
  {
    id: 36,
    name: 'Scented Candle Set',
    slug: 'scented-candle-set',
    description: 'Set of 3 soy wax candles with calming scents',
    price: 22.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1509228627153-5b2a9a7f6f3d?w=500'
    ],
    stock: 160,
    rating: 4.7,
    reviews: 45,
    tags: ['home', 'decor', 'candles'],
    featured: false,
    specifications: {
      'Burn Time': '30 hours each',
      'Wax': 'Soy',
    }
  },
  {
    id: 37,
    name: 'Beginner\'s Guitar Starter Pack',
    slug: 'beginners-guitar-starter-pack',
    description: 'Acoustic guitar with gig bag, tuner, and picks',
    price: 89.99,
    compareAtPrice: 129.99,
    category: 'electronics',
    categoryId: 1,
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500'
    ],
    stock: 44,
    rating: 4.4,
    reviews: 31,
    tags: ['music', 'instruments', 'beginner'],
    featured: false,
    specifications: {
      'Type': 'Acoustic',
      'Includes': 'Gig bag, Tuner',
    }
  },
  {
    id: 38,
    name: 'Eco-Friendly Reusable Straw Set',
    slug: 'eco-friendly-reusable-straw-set',
    description: 'Set of 8 stainless steel straws with cleaning brush and pouch',
    price: 9.99,
    compareAtPrice: null,
    category: 'home-garden',
    categoryId: 3,
    images: [
      'https://images.unsplash.com/photo-1524594154907-6a8b2b2b3b9f?w=500'
    ],
    stock: 400,
    rating: 4.8,
    reviews: 210,
    tags: ['home', 'eco', 'kitchen'],
    featured: false,
    specifications: {
      'Material': 'Stainless Steel',
      'Includes': '8 Straws, Brush, Pouch',
    }
  },
  {
    id: 39,
    name: 'Board Game: Strategy Quest',
    slug: 'board-game-strategy-quest',
    description: 'Strategy board game for 2-4 players, 60-90 minute playtime',
    price: 49.99,
    compareAtPrice: 59.99,
    category: 'toys',
    categoryId: 6,
    images: [
      'https://images.unsplash.com/photo-1606813902891-6d86f5f8d8b2?w=500'
    ],
    stock: 74,
    rating: 4.7,
    reviews: 39,
    tags: ['games', 'family', 'boardgame'],
    featured: false,
    specifications: {
      'Players': '2-4',
      'Time': '60-90 min',
    }
  },
  {
    id: 40,
    name: 'Heritage Wool Scarf',
    slug: 'heritage-wool-scarf',
    description: 'Soft wool scarf with classic pattern, one size fits all',
    price: 29.99,
    compareAtPrice: null,
    category: 'clothing',
    categoryId: 2,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500'
    ],
    stock: 150,
    rating: 4.6,
    reviews: 54,
    tags: ['clothing', 'accessories', 'wool'],
    featured: false,
    specifications: {
      'Material': 'Wool Blend',
      'Length': '180cm',
    }
  }
];


export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

export const getProductBySlug = (slug) => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug) => {
  return products.filter(p => p.category === categorySlug);
};

export const getFeaturedProducts = () => {
  return products.filter(p => p.featured);
};