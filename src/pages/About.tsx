
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About TechTreasures
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're passionate about bringing you the latest and greatest in technology. 
            From cutting-edge gadgets to essential tech tools, we curate premium products 
            for students, professionals, and tech enthusiasts.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At TechTreasures, we believe technology should enhance your life, not complicate it. 
                We carefully select each product in our catalog to ensure it meets our high standards 
                for quality, innovation, and value.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're a student looking for your first laptop, a professional upgrading 
                your setup, or a tech enthusiast seeking the latest innovations, we're here to help 
                you find exactly what you need.
              </p>
              <Button
                onClick={() => navigate('/products')}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl"
              >
                Explore Products
              </Button>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-gray-600">Premium Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Customer Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We only partner with trusted brands and rigorously test every product 
                to ensure it meets our quality standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We stay ahead of the curve, bringing you the latest technological 
                innovations as soon as they're available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Care</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We provide exceptional customer 
                service and support throughout your journey with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl mb-8 opacity-90">
            Discover our curated collection of premium technology products
          </p>
          <Button
            onClick={() => navigate('/products')}
            className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
          >
            Browse Products
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
