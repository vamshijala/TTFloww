
import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 16" M3',
    price: 239900,
    originalPrice: 259900,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    category: 'Laptops',
    description: 'Professional laptop with M3 chip for ultimate performance',
    longDescription: 'The MacBook Pro 16-inch with M3 chip delivers exceptional performance for professionals. Whether you\'re editing 4K video, compiling code, or running complex simulations, this laptop handles it all with ease. Features include a stunning Liquid Retina XDR display, up to 22 hours of battery life, and a comprehensive set of ports.',
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    stockCount: 12,
    features: ['M3 Pro chip', '16-inch Liquid Retina XDR display', '32GB unified memory', '1TB SSD storage', 'Up to 22 hours battery life']
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    price: 134900,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
    category: 'Smartphones',
    description: 'Latest iPhone with titanium design and advanced camera system',
    longDescription: 'The iPhone 15 Pro Max represents the pinnacle of smartphone technology. Built with aerospace-grade titanium, it features the most advanced camera system ever in an iPhone, powered by the A17 Pro chip. Capture stunning photos and videos, enjoy all-day battery life, and experience the smoothest iOS performance.',
    rating: 4.9,
    reviewCount: 243,
    inStock: true,
    stockCount: 8,
    features: ['A17 Pro chip', 'Titanium design', '48MP Main camera', '6.7-inch Super Retina XDR display', 'USB-C connector']
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    price: 29990,
    originalPrice: 34990,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop',
    category: 'Audio',
    description: 'Premium noise-canceling wireless headphones',
    longDescription: 'Experience industry-leading noise cancellation with the Sony WH-1000XM5. These premium headphones deliver exceptional sound quality, up to 30 hours of battery life, and advanced features like Speak-to-Chat technology. Perfect for travel, work, or leisure listening.',
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockCount: 25,
    features: ['Industry-leading noise cancellation', '30-hour battery life', 'Premium sound quality', 'Speak-to-Chat technology', 'Comfortable design']
  },
  {
    id: '4',
    name: 'iPad Pro 12.9" M2',
    price: 109900,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop',
    category: 'Tablets',
    description: 'Professional tablet with M2 chip and Liquid Retina XDR display',
    longDescription: 'The iPad Pro 12.9-inch with M2 chip is the ultimate creative tool. Whether you\'re designing graphics, editing videos, or building presentations, this tablet delivers desktop-class performance in a portable form factor. The Liquid Retina XDR display brings your content to life with stunning detail and color accuracy.',
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    stockCount: 15,
    features: ['M2 chip', '12.9-inch Liquid Retina XDR display', 'Apple Pencil support', 'Magic Keyboard compatible', 'All-day battery life']
  },
  {
    id: '5',
    name: 'Samsung Galaxy S24 Ultra',
    price: 124999,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop',
    category: 'Smartphones',
    description: 'Advanced Android smartphone with S Pen and AI features',
    longDescription: 'The Samsung Galaxy S24 Ultra combines cutting-edge technology with productivity features. Built with a titanium frame, it includes an integrated S Pen, advanced AI photography features, and a brilliant 6.8-inch Dynamic AMOLED display. Perfect for power users who demand the best.',
    rating: 4.5,
    reviewCount: 178,
    inStock: true,
    stockCount: 20,
    features: ['Snapdragon 8 Gen 3', '6.8-inch Dynamic AMOLED display', 'Integrated S Pen', 'AI-powered camera', 'Titanium build']
  },
  {
    id: '6',
    name: 'Apple Watch Series 9',
    price: 41900,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop',
    category: 'Wearables',
    description: 'Advanced smartwatch with health monitoring and fitness tracking',
    longDescription: 'The Apple Watch Series 9 is your ultimate health and fitness companion. With advanced health monitoring features, comprehensive workout tracking, and seamless iPhone integration, it helps you stay connected and motivated throughout your day.',
    rating: 4.4,
    reviewCount: 267,
    inStock: false,
    stockCount: 0,
    features: ['S9 SiP chip', 'Always-On Retina display', 'Health monitoring', 'Fitness tracking', 'Water resistant']
  }
];
