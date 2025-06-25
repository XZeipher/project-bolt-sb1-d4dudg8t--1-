import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  CreditCard,
  MapPin,
  Check,
  ArrowLeft,
  Lock
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { createOrder } from '../store/slices/orderSlice';
import { clearCart } from '../store/slices/cartSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { items, totalPrice, shippingCost, tax, discount } = useAppSelector((state) => state.cart);

  const finalTotal = totalPrice + shippingCost + tax - discount;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Create order
      const orderData = {
        items: items.map(item => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        totalAmount: finalTotal,
        shipping: {
          address: shippingInfo,
          method: 'standard',
          cost: shippingCost,
        },
        payment: {
          method: 'card',
          status: 'completed',
        },
      };

      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      setStep(3);
    } catch (error) {
      console.error('Order creation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && step < 3) {
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
            Add some items to your cart before proceeding to checkout.
          </p>
          <Button onClick={() => navigate('/shop')} icon={ShoppingBag}>
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, label: 'Shipping', icon: MapPin },
              { step: 2, label: 'Payment', icon: CreditCard },
              { step: 3, label: 'Complete', icon: Check }
            ].map(({ step: stepNum, label, icon: Icon }) => (
              <div key={stepNum} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  step >= stepNum 
                    ? 'bg-primary-500 text-white border-primary-500' 
                    : 'bg-white text-neutral-400 border-neutral-300'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${step >= stepNum ? 'text-neutral-800' : 'text-neutral-400'}`}>
                  {label}
                </span>
                {stepNum < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${step > stepNum ? 'bg-primary-500' : 'bg-neutral-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Shipping Form */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <Button
                    variant="ghost"
                    icon={ArrowLeft}
                    onClick={() => navigate('/cart')}
                    size="sm"
                  >
                    Back to Cart
                  </Button>
                  <h2 className="text-2xl font-heading font-bold text-neutral-800">
                    Shipping Information
                  </h2>
                </div>
                
                <form onSubmit={handleShippingSubmit} className="card space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      type="text"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    />
                    
                    <Input
                      label="Last Name"
                      type="text"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    />
                    
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    />
                    
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    />
                  </div>
                  
                  <Input
                    label="Address"
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      label="City"
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    />
                    
                    <Input
                      label="State"
                      type="text"
                      required
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                    />
                    
                    <Input
                      label="ZIP Code"
                      type="text"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="card h-fit">
                <h3 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-neutral-800 text-sm">{item.name}</p>
                        <p className="text-xs text-neutral-600">{item.size} • {item.color} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-neutral-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 text-sm border-t border-neutral-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
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
                  <div className="border-t border-neutral-200 pt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-neutral-800">Total</span>
                      <span className="font-bold text-neutral-800">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <Button
                    variant="ghost"
                    icon={ArrowLeft}
                    onClick={() => setStep(1)}
                    size="sm"
                  >
                    Back to Shipping
                  </Button>
                  <h2 className="text-2xl font-heading font-bold text-neutral-800">
                    Payment Information
                  </h2>
                </div>
                
                <form onSubmit={handlePaymentSubmit} className="card space-y-6">
                  <div className="flex items-center space-x-2 text-green-600 mb-4">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">Your payment information is secure and encrypted</span>
                  </div>

                  <Input
                    label="Card Number"
                    type="text"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  />
                  
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="Expiry Date"
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    />
                    
                    <Input
                      label="CVV"
                      type="text"
                      required
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    />
                  </div>
                  
                  <Input
                    label="Cardholder Name"
                    type="text"
                    required
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    loading={isProcessing}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Complete Order - $${finalTotal.toFixed(2)}`}
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="card h-fit">
                <h3 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-neutral-800 text-sm">{item.name}</p>
                        <p className="text-xs text-neutral-600">{item.size} • {item.color} • Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-neutral-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 text-sm border-t border-neutral-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
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
                  <div className="border-t border-neutral-200 pt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-neutral-800">Total</span>
                      <span className="font-bold text-neutral-800">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-heading font-bold text-neutral-800 mb-4">
                Order Complete!
              </h2>
              
              <p className="text-neutral-600 mb-8 text-lg">
                Thank you for your purchase! Your order has been confirmed and will be shipped soon. 
                You'll receive a confirmation email with tracking information.
              </p>
              
              <div className="card mb-8">
                <h3 className="font-heading font-semibold text-neutral-800 mb-4">
                  Order Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-semibold">#YS{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-semibold">${finalTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span className="font-semibold">3-5 business days</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/shop')} icon={ShoppingBag}>
                  Continue Shopping
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/profile')}
                >
                  View Orders
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Checkout;