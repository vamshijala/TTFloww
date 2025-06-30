
import React from 'react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockProducts';

const Home = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium technology products
            </p>
          </div>
          
          <div className="swiss-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest tech news and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
