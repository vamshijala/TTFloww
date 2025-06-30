
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/data/mockProducts';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfSar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfSar) {
      stars.push(<span key="half" className="text-yellow-400">½</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return stars;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-primary">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate('/products')} className="hover:text-primary">
              Products
            </button>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {!product.inStock ? (
                <Badge variant="destructive">Sold Out</Badge>
              ) : product.stockCount && product.stockCount <= 5 ? (
                <Badge variant="outline" className="text-orange-600">
                  Only {product.stockCount} left — order soon!
                </Badge>
              ) : (
                <Badge variant="outline" className="text-green-600">
                  In Stock
                </Badge>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 text-center min-w-[3rem]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                disabled={!product.inStock}
                className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>✓ Free delivery on orders above ₹999</p>
              <p>✓ Inclusive of all taxes</p>
              <p>✓ 1 year warranty included</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {showFullDescription ? product.longDescription : product.description}
            </p>
            {product.longDescription !== product.description && (
              <Button
                variant="ghost"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-4 text-primary hover:text-primary/80"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
            <div className="swiss-grid">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
