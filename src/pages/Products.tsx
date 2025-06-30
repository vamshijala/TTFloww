
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import { Button } from '@/components/ui/button';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = ['All', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredProducts = mockProducts.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600">
            Explore our complete collection of premium technology products
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-xl"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:w-48">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="swiss-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
