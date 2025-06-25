import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  MapPin, 
  Check, 
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { trackOrder } from '../store/slices/orderSlice';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useAppDispatch();
  const { currentOrder: order, isLoading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(trackOrder(orderId));
    }
  }, [dispatch, orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-4">
            Order not found
          </h2>
          <p className="text-neutral-600">
            Please check your order number and try again.
          </p>
        </div>
      </div>
    );
  }

  const trackingSteps = [
    {
      id: 'pending',
      label: 'Order Placed',
      description: 'Your order has been received',
      icon: Package,
      completed: true,
      date: order.createdAt,
    },
    {
      id: 'processing',
      label: 'Processing',
      description: 'Your order is being prepared',
      icon: Clock,
      completed: ['processing', 'shipped', 'delivered'].includes(order.status),
      date: order.status === 'processing' ? new Date().toISOString() : null,
    },
    {
      id: 'shipped',
      label: 'Shipped',
      description: 'Your order is on its way',
      icon: Truck,
      completed: ['shipped', 'delivered'].includes(order.status),
      date: order.status === 'shipped' ? new Date().toISOString() : null,
    },
    {
      id: 'delivered',
      label: 'Delivered',
      description: 'Your order has been delivered',
      icon: Check,
      completed: order.status === 'delivered',
      date: order.status === 'delivered' ? new Date().toISOString() : null,
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
            Track Your Order
          </h1>
          <p className="text-neutral-600">
            Order #{order.orderNumber} • Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2">
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                Order Status
              </h2>

              <div className="space-y-8">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-neutral-200 text-neutral-400'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${
                          step.completed ? 'text-neutral-800' : 'text-neutral-400'
                        }`}>
                          {step.label}
                        </h3>
                        {step.date && (
                          <span className="text-sm text-neutral-500">
                            {new Date(step.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        step.completed ? 'text-neutral-600' : 'text-neutral-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    
                    {index < trackingSteps.length - 1 && (
                      <div className={`absolute left-6 mt-12 w-0.5 h-8 ${
                        trackingSteps[index + 1].completed ? 'bg-primary-500' : 'bg-neutral-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Tracking Number */}
              {order.shipping.trackingNumber && (
                <div className="mt-8 p-4 bg-primary-50 rounded-2xl">
                  <h4 className="font-semibold text-neutral-800 mb-2">
                    Tracking Number
                  </h4>
                  <p className="text-primary-600 font-mono">
                    {order.shipping.trackingNumber}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-heading font-semibold text-neutral-800 mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Shipping Address</span>
              </h3>
              <div className="text-sm text-neutral-600 space-y-1">
                <p>{order.shipping.address.firstName} {order.shipping.address.lastName}</p>
                <p>{order.shipping.address.street}</p>
                <p>{order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zipCode}</p>
                <p>{order.shipping.address.country}</p>
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-heading font-semibold text-neutral-800 mb-4">
                Order Items ({order.items.length})
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-neutral-800 text-sm">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-neutral-800 text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-neutral-200 mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold text-neutral-800">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-heading font-semibold text-neutral-800 mb-4">
                Need Help?
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+1-555-123-4567"
                  className="flex items-center space-x-3 text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a
                  href="mailto:support@yuristore.com"
                  className="flex items-center space-x-3 text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>support@yuristore.com</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;