
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

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
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">½</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }

    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover-lift hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="text-xs font-medium">
            {product.category}
          </Badge>
          {!product.inStock ? (
            <Badge variant="destructive" className="text-xs">
              Sold Out
            </Badge>
          ) : product.stockCount && product.stockCount <= 5 ? (
            <Badge variant="outline" className="text-xs text-orange-600">
              Only {product.stockCount} left
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs text-green-600">
              In Stock
            </Badge>
          )}
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        </Link>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            disabled={!product.inStock}
            className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
