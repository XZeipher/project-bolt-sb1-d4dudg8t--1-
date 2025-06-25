import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  DollarSign,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAdminStats } from '../../store/slices/adminSlice';

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, isLoading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const mockStats = {
    totalProducts: 248,
    totalOrders: 1429,
    totalCustomers: 892,
    totalRevenue: 45280,
    recentOrders: [
      { id: '1', customer: 'Emma Rodriguez', amount: 129.99, status: 'completed' },
      { id: '2', customer: 'Sophia Chen', amount: 89.99, status: 'processing' },
      { id: '3', customer: 'Isabella Martinez', amount: 199.99, status: 'shipped' },
    ],
    topProducts: [
      { name: 'Ethereal Silk Blouse', sales: 156, revenue: 14040 },
      { name: 'Dreamy Cashmere Sweater', sales: 134, revenue: 20086 },
      { name: 'Celestial Maxi Dress', sales: 98, revenue: 12740 },
    ]
  };

  const statCards = [
    {
      title: 'Total Products',
      value: mockStats.totalProducts,
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'primary'
    },
    {
      title: 'Total Orders',
      value: mockStats.totalOrders,
      change: '+8%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'secondary'
    },
    {
      title: 'Total Customers',
      value: mockStats.totalCustomers,
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'accent'
    },
    {
      title: 'Revenue',
      value: `$${mockStats.totalRevenue.toLocaleString()}`,
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'primary'
    }
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
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600">
            Welcome back! Here's what's happening with your store today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.color === 'primary' ? 'bg-primary-100' :
                  stat.color === 'secondary' ? 'bg-secondary-100' :
                  'bg-accent-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'primary' ? 'text-primary-600' :
                    stat.color === 'secondary' ? 'text-secondary-600' :
                    'text-accent-600'
                  }`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-neutral-800">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-800">
                Recent Orders
              </h2>
              <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                <Eye className="w-4 h-4" />
                <span>View All</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {mockStats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-b-0">
                  <div>
                    <p className="font-semibold text-neutral-800">{order.customer}</p>
                    <p className="text-sm text-neutral-600">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-800">${order.amount}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-600' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-800">
                Top Products
              </h2>
              <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>View Report</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {mockStats.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-800">{product.name}</p>
                    <p className="text-sm text-neutral-600">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-800">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="card text-center">
            <Package className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-neutral-800 mb-2">
              Manage Products
            </h3>
            <p className="text-neutral-600 text-sm mb-4">
              Add, edit, or remove products from your inventory
            </p>
            <button className="btn-primary w-full">
              Go to Products
            </button>
          </div>

          <div className="card text-center">
            <ShoppingBag className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-neutral-800 mb-2">
              Process Orders
            </h3>
            <p className="text-neutral-600 text-sm mb-4">
              View and manage customer orders and shipments
            </p>
            <button className="btn-primary w-full">
              View Orders
            </button>
          </div>

          <div className="card text-center">
            <Users className="w-12 h-12 text-accent-600 mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-neutral-800 mb-2">
              Customer Support
            </h3>
            <p className="text-neutral-600 text-sm mb-4">
              Manage customer inquiries and support tickets
            </p>
            <button className="btn-primary w-full">
              Support Center
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;