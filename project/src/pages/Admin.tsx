import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { mockProducts } from '../data/mockData';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  const stats = [
    { label: 'Total Products', value: '248', change: '+12%', color: 'primary' },
    { label: 'Total Orders', value: '1,429', change: '+8%', color: 'secondary' },
    { label: 'Total Customers', value: '892', change: '+15%', color: 'accent' },
    { label: 'Revenue', value: '$45,280', change: '+23%', color: 'primary' },
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
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
            Manage your store, products, and customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="bg-white rounded-3xl p-6 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-neutral-600">
                          {stat.label}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          stat.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                          stat.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                          'bg-accent-100 text-accent-600'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-neutral-800">
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h2 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {[
                      { action: 'New order received', time: '2 minutes ago', type: 'order' },
                      { action: 'Product "Ethereal Silk Blouse" updated', time: '1 hour ago', type: 'product' },
                      { action: 'New customer registered', time: '3 hours ago', type: 'customer' },
                      { action: 'Order #1234 shipped', time: '5 hours ago', type: 'order' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4 py-3 border-b border-neutral-100 last:border-b-0">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'order' ? 'bg-primary-500' :
                          activity.type === 'product' ? 'bg-secondary-500' :
                          'bg-accent-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-neutral-800">{activity.action}</p>
                          <p className="text-sm text-neutral-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl font-heading font-bold text-neutral-800">
                    Products ({filteredProducts.length})
                  </h2>
                  <button className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 bg-white border border-neutral-300 text-neutral-700 px-4 py-3 rounded-xl hover:bg-neutral-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-4 px-2 font-semibold text-neutral-700">Product</th>
                        <th className="text-left py-4 px-2 font-semibold text-neutral-700">Price</th>
                        <th className="text-left py-4 px-2 font-semibold text-neutral-700">Stock</th>
                        <th className="text-left py-4 px-2 font-semibold text-neutral-700">Status</th>
                        <th className="text-left py-4 px-2 font-semibold text-neutral-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.slice(0, 10).map((product) => (
                        <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-semibold text-neutral-800">{product.name}</p>
                                <p className="text-sm text-neutral-600">{product.categories.join(', ')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <span className="font-semibold text-neutral-800">
                              ${product.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.inventory.quantity > 10
                                ? 'bg-green-100 text-green-600'
                                : product.inventory.quantity > 0
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {product.inventory.quantity} in stock
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                              Active
                            </span>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-neutral-600 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                  Recent Orders
                </h2>
                
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-neutral-600">
                    Orders will appear here once customers start purchasing.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                  Customer Management
                </h2>
                
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    Customer data coming soon
                  </h3>
                  <p className="text-neutral-600">
                    Customer management features will be available here.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;