import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package,
  Calendar,
  Download
} from 'lucide-react';
import Button from '../../components/common/Button';

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,280',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: 'Orders',
      value: '1,429',
      change: '+8%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'secondary'
    },
    {
      title: 'Customers',
      value: '892',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'accent'
    },
    {
      title: 'Products Sold',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'primary'
    }
  ];

  const topProducts = [
    { name: 'Ethereal Silk Blouse', sales: 156, revenue: 14040, trend: 'up' },
    { name: 'Dreamy Cashmere Sweater', sales: 134, revenue: 20086, trend: 'up' },
    { name: 'Celestial Maxi Dress', sales: 98, revenue: 12740, trend: 'down' },
    { name: 'Moonlight Denim Jacket', sales: 87, revenue: 10443, trend: 'up' },
    { name: 'Angel Wings Cardigan', sales: 76, revenue: 7600, trend: 'up' },
  ];

  const salesData = [
    { month: 'Jan', revenue: 12000, orders: 145 },
    { month: 'Feb', revenue: 15000, orders: 178 },
    { month: 'Mar', revenue: 18000, orders: 203 },
    { month: 'Apr', revenue: 22000, orders: 234 },
    { month: 'May', revenue: 28000, orders: 289 },
    { month: 'Jun', revenue: 32000, orders: 312 },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-2">
              Analytics
            </h1>
            <p className="text-neutral-600">
              Track your store's performance and growth
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="input-field"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            
            <Button variant="outline" icon={Download}>
              Export
            </Button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  metric.color === 'primary' ? 'bg-primary-100' :
                  metric.color === 'secondary' ? 'bg-secondary-100' :
                  'bg-accent-100'
                }`}>
                  <metric.icon className={`w-6 h-6 ${
                    metric.color === 'primary' ? 'text-primary-600' :
                    metric.color === 'secondary' ? 'text-secondary-600' :
                    'text-accent-600'
                  }`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? 
                    <TrendingUp className="w-4 h-4" /> : 
                    <TrendingDown className="w-4 h-4" />
                  }
                  <span>{metric.change}</span>
                </div>
              </div>
              
              <h3 className="text-sm font-semibold text-neutral-600 mb-1">
                {metric.title}
              </h3>
              <p className="text-2xl font-bold text-neutral-800">
                {metric.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-neutral-800">
                Revenue Overview
              </h2>
              <div className="flex items-center space-x-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4" />
                <span>Last 6 months</span>
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex items-center space-x-4">
                  <span className="w-8 text-sm text-neutral-600">{data.month}</span>
                  <div className="flex-1 bg-neutral-100 rounded-full h-6 relative">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-6 rounded-full flex items-center justify-end pr-2"
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.revenue / 35000) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <span className="text-white text-xs font-medium">
                        ${data.revenue.toLocaleString()}
                      </span>
                    </motion.div>
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
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-800 text-sm">{product.name}</p>
                      <p className="text-xs text-neutral-600">{product.sales} sales</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-neutral-800 text-sm">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <div className={`flex items-center space-x-1 text-xs ${
                      product.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.trend === 'up' ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="font-heading font-semibold text-neutral-800 mb-4">
              Conversion Rate
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">3.2%</div>
              <div className="flex items-center justify-center space-x-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+0.5% from last month</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="font-heading font-semibold text-neutral-800 mb-4">
              Average Order Value
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600 mb-2">$127</div>
              <div className="flex items-center justify-center space-x-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+$12 from last month</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h3 className="font-heading font-semibold text-neutral-800 mb-4">
              Customer Retention
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">68%</div>
              <div className="flex items-center justify-center space-x-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+5% from last month</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;