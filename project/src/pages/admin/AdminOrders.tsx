import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Package,
  Truck,
  Check,
  Clock,
  X
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAdminOrders } from '../../store/slices/adminSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  // Mock orders data for demonstration
  const mockOrders = [
    {
      _id: '1',
      orderNumber: 'YS001234',
      customer: {
        firstName: 'Emma',
        lastName: 'Rodriguez',
        email: 'emma@example.com'
      },
      items: [
        {
          product: { name: 'Ethereal Silk Blouse', images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=100'] },
          quantity: 1,
          price: 89.99
        }
      ],
      totalAmount: 89.99,
      status: 'processing',
      payment: { status: 'completed' },
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      orderNumber: 'YS001235',
      customer: {
        firstName: 'Sophia',
        lastName: 'Chen',
        email: 'sophia@example.com'
      },
      items: [
        {
          product: { name: 'Dreamy Cashmere Sweater', images: ['https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg?auto=compress&cs=tinysrgb&w=100'] },
          quantity: 1,
          price: 149.99
        }
      ],
      totalAmount: 149.99,
      status: 'shipped',
      payment: { status: 'completed' },
      createdAt: '2024-01-14T14:20:00Z'
    },
    {
      _id: '3',
      orderNumber: 'YS001236',
      customer: {
        firstName: 'Isabella',
        lastName: 'Martinez',
        email: 'isabella@example.com'
      },
      items: [
        {
          product: { name: 'Celestial Maxi Dress', images: ['https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=100'] },
          quantity: 1,
          price: 129.99
        }
      ],
      totalAmount: 129.99,
      status: 'delivered',
      payment: { status: 'completed' },
      createdAt: '2024-01-13T09:15:00Z'
    },
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'processing':
        return Package;
      case 'shipped':
        return Truck;
      case 'delivered':
        return Check;
      case 'cancelled':
        return X;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'processing':
        return 'bg-blue-100 text-blue-600';
      case 'shipped':
        return 'bg-purple-100 text-purple-600';
      case 'delivered':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-2">
            Orders
          </h1>
          <p className="text-neutral-600">
            Manage customer orders and track fulfillment
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search orders, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input-field"
            />
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Order</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Customer</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Items</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Total</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-neutral-800">#{order.orderNumber}</p>
                          <p className="text-sm text-neutral-600">
                            Payment: {order.payment.status}
                          </p>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-neutral-800">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                          <p className="text-sm text-neutral-600">{order.customer.email}</p>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, index) => (
                              <img
                                key={index}
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-8 h-8 rounded-lg object-cover border-2 border-white"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 border-2 border-white flex items-center justify-center">
                                <span className="text-xs font-medium text-neutral-600">
                                  +{order.items.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-neutral-600">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <span className="font-semibold text-neutral-800">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </td>
                      
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                        </span>
                      </td>
                      
                      <td className="py-4 px-4">
                        <span className="text-sm text-neutral-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <select className="text-sm border border-neutral-300 rounded-lg px-2 py-1">
                            <option value="">Update Status</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                No orders found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                3
              </button>
              <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;