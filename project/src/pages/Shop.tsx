import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  Star, 
  ChevronDown, 
  Grid3X3, 
  List,
  SlidersHorizontal,
  Heart,
  ShoppingBag
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { 
  fetchProducts, 
  fetchCategories, 
  setFilters, 
  clearFilters, 
  setSearchQuery, 
  setSortBy,
  setCurrentPage 
} from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import Button from '../components/common/Button';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useAppDispatch();
  const { 
    products, 
    categories, 
    filters, 
    searchQuery, 
    sortBy, 
    currentPage, 
    totalPages, 
    totalProducts, 
    isLoading 
  } = useAppSelector((state) => state.products);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Yellow'];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 12,
      filters: {
        category: selectedCategories.length > 0 ? selectedCategories : undefined,
        priceRange: priceRange[1] < 500 ? priceRange : undefined,
        sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
        rating: minRating > 0 ? minRating : undefined,
      },
      search: localSearchQuery || undefined,
      sort: sortBy,
    };

    dispatch(fetchProducts(params));
  }, [dispatch, currentPage, selectedCategories, priceRange, selectedSizes, selectedColors, minRating, localSearchQuery, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    dispatch(setCurrentPage(1));
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
    dispatch(setCurrentPage(1));
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
    dispatch(setCurrentPage(1));
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinRating(0);
    setLocalSearchQuery('');
    dispatch(clearFilters());
    dispatch(setCurrentPage(1));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0] || 'M',
      color: product.colors[0] || 'Black',
      maxQuantity: product.inventory.quantity,
    }));
  };

  const handleAddToWishlist = (productId: string) => {
    dispatch(addToWishlist(productId));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shop All Products
          </motion.h1>
          <motion.p 
            className="text-neutral-600 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover our complete collection of premium fashion pieces, carefully curated for style and quality.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 w-full justify-center bg-white rounded-xl px-4 py-3 border border-primary-200 hover:border-primary-300 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  className="card space-y-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      Search Products
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={localSearchQuery}
                        onChange={(e) => setLocalSearchQuery(e.target.value)}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      Categories
                    </label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="rounded border-primary-300 text-primary-500 focus:ring-primary-300"
                          />
                          <span className="text-neutral-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      Price Range
                    </label>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex items-center justify-between text-sm text-neutral-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeToggle(size)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            selectedSizes.includes(size)
                              ? 'bg-primary-500 text-white border-primary-500'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      Colors
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {allColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorToggle(color)}
                          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                            selectedColors.includes(color)
                              ? 'bg-primary-500 text-white border-primary-500'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-800 mb-3">
                      Minimum Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                          className={`p-1 ${
                            rating <= minRating ? 'text-accent-500' : 'text-neutral-300'
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <p className="text-neutral-600">
                Showing {products.length} of {totalProducts} products
              </p>
              
              <div className="flex items-center space-x-4">
                {/* View Mode */}
                <div className="flex items-center space-x-1 bg-white rounded-lg border border-primary-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="card">
                    <div className="shimmer aspect-[3/4] rounded-2xl mb-4"></div>
                    <div className="shimmer h-4 rounded mb-2"></div>
                    <div className="shimmer h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Products */}
            {!isLoading && (
              <motion.div 
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
                layout
              >
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      className={`group cursor-pointer ${
                        viewMode === 'list' ? 'flex space-x-4' : ''
                      }`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className={`card ${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
                        <div className={`relative overflow-hidden rounded-2xl ${
                          viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[3/4] mb-4'
                        }`}>
                          <Link to={`/product/${product._id}`}>
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </Link>
                          
                          {/* Quick Actions */}
                          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => handleAddToWishlist(product._id)}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition-colors"
                            >
                              <Heart className="w-4 h-4 text-primary-600" />
                            </button>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-primary-50 transition-colors"
                            >
                              <ShoppingBag className="w-4 h-4 text-primary-600" />
                            </button>
                          </div>

                          {product.comparePrice && product.comparePrice > product.price && (
                            <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Sale
                            </div>
                          )}
                        </div>
                        
                        <div className={`space-y-2 ${viewMode === 'list' ? 'flex-1 py-2' : ''}`}>
                          <Link to={`/product/${product._id}`}>
                            <h3 className="font-heading font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors duration-200">
                              {product.name}
                            </h3>
                          </Link>
                          
                          {viewMode === 'list' && (
                            <p className="text-neutral-600 text-sm line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-neutral-800">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.comparePrice && product.comparePrice > product.price && (
                              <span className="text-sm text-neutral-500 line-through">
                                ${product.comparePrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-accent-500 fill-current'
                                    : 'text-neutral-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-neutral-600 ml-2">
                              ({product.reviews.length})
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.slice(0, 3).map((size) => (
                              <span
                                key={size}
                                className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* No Products Found */}
            {!isLoading && products.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-primary-400" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-neutral-800 mb-2">
                  No products found
                </h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <Button onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => dispatch(setCurrentPage(index + 1))}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === index + 1
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-neutral-700 hover:bg-primary-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;