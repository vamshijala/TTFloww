
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Discover the{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Future
            </span>
            .{' '}
            <br className="hidden sm:block" />
            Shop the Best in Tech.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Handpicked innovations. Trusted by tech leaders and students alike.
            Elevate your digital experience with premium technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => navigate('/products')}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Browse Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/about')}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:shadow-md"
            >
              Learn More
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
