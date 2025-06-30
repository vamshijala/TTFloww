
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { state, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryFee = state.total >= 99900 ? 0 : 999; // Free delivery above ₹999
  const finalTotal = state.total + deliveryFee;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Looks like your cart is empty… let's fix that.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover amazing tech products and add them to your cart
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/products')}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{state.itemCount} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 text-center min-w-[3rem]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-sm text-gray-500">
                    Add {formatPrice(99900 - state.total)} more for free delivery
                  </p>
                )}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Don't forget to apply your coupon.</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
