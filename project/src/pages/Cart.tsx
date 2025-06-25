import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Minus, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Tag
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { updateQuantity, removeFromCart, applyCoupon, removeCoupon } from '../store/slices/cartSlice';
import Button from '../components/common/Button';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice, shippingCost, tax, discount, couponCode } = useAppSelector((state) => state.cart);

  const finalTotal = totalPrice + shippingCost + tax - discount;

  const handleUpdateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    dispatch(updateQuantity({ productId, size, color, quantity }));
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    dispatch(removeFromCart({ productId, size, color }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const code = formData.get('coupon') as string;
    
    // Mock coupon validation
    if (code === 'SAVE10') {
      dispatch(applyCoupon({ code, discount: totalPrice * 0.1 }));
    } else {
      // Handle invalid coupon
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-primary-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-neutral-600 mb-6">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          <Button as={Link} to="/shop" icon={ShoppingBag}>
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/shop">
            <Button variant="ghost" icon={ArrowLeft} size="sm">
              Continue Shopping
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800">
              Shopping Cart
            </h1>
            <p className="text-neutral-600">{totalItems} items in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="card"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-neutral-800 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-2">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                      <p className="text-lg font-bold text-neutral-800">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-neutral-300 rounded-xl">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="p-2 hover:bg-primary-50 transition-colors rounded-l-xl"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-primary-50 transition-colors rounded-r-xl"
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.productId, item.size, item.color)}
                        className="p-2 text-secondary-500 hover:text-secondary-600 hover:bg-secondary-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <div className="card">
              <h3 className="font-heading font-semibold text-neutral-800 mb-4">
                Coupon Code
              </h3>
              
              {couponCode ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="text-green-800 font-medium">{couponCode}</span>
                  </div>
                  <button
                    onClick={() => dispatch(removeCoupon())}
                    className="text-green-600 hover:text-green-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    name="coupon"
                    placeholder="Enter coupon code"
                    className="input-field flex-1"
                  />
                  <Button type="submit" size="sm">
                    Apply
                  </Button>
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="card">
              <h3 className="font-heading font-semibold text-neutral-800 mb-6">
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-neutral-800">Total</span>
                    <span className="font-bold text-neutral-800">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button as={Link} to="/checkout" className="w-full">
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-neutral-500 text-center mt-4">
                Shipping and taxes calculated at checkout
              </p>
            </div>

            {/* Security Features */}
            <div className="card">
              <h4 className="font-semibold text-neutral-800 mb-4">Secure Checkout</h4>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SSL encrypted payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free shipping over $100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;