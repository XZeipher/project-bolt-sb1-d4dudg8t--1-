import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye,
  MoreVertical
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAdminProducts } from '../../store/slices/adminSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AdminProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // Mock products data for demonstration
  const mockProducts = [
    {
      _id: '1',
      name: 'Ethereal Silk Blouse',
      price: 89.99,
      comparePrice: 120.00,
      category: 'Tops',
      inventory: { quantity: 25, reserved: 3 },
      status: 'active',
      images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400'],
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      name: 'Dreamy Cashmere Sweater',
      price: 149.99,
      comparePrice: 200.00,
      category: 'Sweaters',
      inventory: { quantity: 15, reserved: 1 },
      status: 'active',
      images: ['https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg?auto=compress&cs=tinysrgb&w=400'],
      createdAt: '2024-01-14T14:20:00Z'
    },
    {
      _id: '3',
      name: 'Celestial Maxi Dress',
      price: 129.99,
      comparePrice: 180.00,
      category: 'Dresses',
      inventory: { quantity: 0, reserved: 0 },
      status: 'out_of_stock',
      images: ['https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=400'],
      createdAt: '2024-01-13T09:15:00Z'
    },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Tops', 'Dresses', 'Sweaters', 'Jackets', 'Pants', 'Skirts'];

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
              Products
            </h1>
            <p className="text-neutral-600">
              Manage your product inventory and listings
            </p>
          </div>
          <Button icon={Plus}>
            Add Product
          </Button>
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <Button
              variant="outline"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
        </motion.div>

        {/* Products Table */}
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
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Product</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Category</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Price</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Stock</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-neutral-800">{product.name}</p>
                          <p className="text-sm text-neutral-600">
                            Created {new Date(product.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-md text-sm">
                        {product.category}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-semibold text-neutral-800">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.comparePrice > product.price && (
                          <div className="text-sm text-neutral-500 line-through">
                            ${product.comparePrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
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
                    
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {product.status === 'active' ? 'Active' : 'Out of Stock'}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
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
                        <button className="p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                No products found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
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

export default AdminProducts;