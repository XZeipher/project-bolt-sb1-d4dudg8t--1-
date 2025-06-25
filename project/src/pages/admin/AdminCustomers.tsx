import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Users
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAdminCustomers } from '../../store/slices/adminSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AdminCustomers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const dispatch = useAppDispatch();
  const { customers, isLoading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminCustomers());
  }, [dispatch]);

  // Mock customers data for demonstration
  const mockCustomers = [
    {
      _id: '1',
      firstName: 'Emma',
      lastName: 'Rodriguez',
      email: 'emma@example.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100',
      totalOrders: 12,
      totalSpent: 1248.99,
      lastOrderDate: '2024-01-15T10:30:00Z',
      createdAt: '2023-06-15T10:30:00Z',
      status: 'active'
    },
    {
      _id: '2',
      firstName: 'Sophia',
      lastName: 'Chen',
      email: 'sophia@example.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.pexels.com/photos/3586799/pexels-photo-3586799.jpeg?auto=compress&cs=tinysrgb&w=100',
      totalOrders: 8,
      totalSpent: 892.50,
      lastOrderDate: '2024-01-14T14:20:00Z',
      createdAt: '2023-08-22T14:20:00Z',
      status: 'active'
    },
    {
      _id: '3',
      firstName: 'Isabella',
      lastName: 'Martinez',
      email: 'isabella@example.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.pexels.com/photos/3586800/pexels-photo-3586800.jpeg?auto=compress&cs=tinysrgb&w=100',
      totalOrders: 15,
      totalSpent: 2156.75,
      lastOrderDate: '2024-01-13T09:15:00Z',
      createdAt: '2023-04-10T09:15:00Z',
      status: 'active'
    },
  ];

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    return matchesSearch;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'spending-high':
        return b.totalSpent - a.totalSpent;
      case 'spending-low':
        return a.totalSpent - b.totalSpent;
      case 'orders-high':
        return b.totalOrders - a.totalOrders;
      case 'orders-low':
        return a.totalOrders - b.totalOrders;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'spending-high', label: 'Highest Spending' },
    { value: 'spending-low', label: 'Lowest Spending' },
    { value: 'orders-high', label: 'Most Orders' },
    { value: 'orders-low', label: 'Fewest Orders' },
  ];

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
            Customers
          </h1>
          <p className="text-neutral-600">
            Manage customer accounts and view purchase history
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-neutral-800">892</h3>
            <p className="text-neutral-600 text-sm">Total Customers</p>
          </motion.div>

          <motion.div
            className="card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ShoppingBag className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-neutral-800">1,429</h3>
            <p className="text-neutral-600 text-sm">Total Orders</p>
          </motion.div>

          <motion.div
            className="card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Calendar className="w-8 h-8 text-accent-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-neutral-800">156</h3>
            <p className="text-neutral-600 text-sm">New This Month</p>
          </motion.div>

          <motion.div
            className="card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold">$</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-800">$1,247</h3>
            <p className="text-neutral-600 text-sm">Avg. Order Value</p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Customers Table */}
        <motion.div
          className="card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Customer</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Contact</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Orders</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Total Spent</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Last Order</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Joined</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCustomers.map((customer) => (
                  <tr key={customer._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={customer.avatar}
                          alt={`${customer.firstName} ${customer.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-neutral-800">
                            {customer.firstName} {customer.lastName}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === 'active' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            {customer.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-neutral-600">
                          <Mail className="w-3 h-3" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-neutral-600">
                          <Phone className="w-3 h-3" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="font-semibold text-neutral-800">
                        {customer.totalOrders}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="font-semibold text-neutral-800">
                        ${customer.totalSpent.toFixed(2)}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="text-sm text-neutral-600">
                        {new Date(customer.lastOrderDate).toLocaleDateString()}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="text-sm text-neutral-600">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-neutral-600 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedCustomers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                No customers found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {sortedCustomers.length > 0 && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
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

export default AdminCustomers;