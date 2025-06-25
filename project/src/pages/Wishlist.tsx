import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, X, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import Button from '../components/common/Button';

const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: 'M', // Default size
      color: 'Black', // Default color
      maxQuantity: 10, // Default max quantity
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-secondary-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-4">
            Sign in to view your wishlist
          </h2>
          <p className="text-neutral-600 mb-6">
            Create an account or sign in to save your favorite items.
          </p>
          <Button as={Link} to="/auth">
            Sign In
          </Button>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-secondary-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-neutral-600 mb-6">
            Save items you love to your wishlist for easy access later.
          </p>
          <Button as={Link} to="/shop" icon={ShoppingBag}>
            Browse Products
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
            My Wishlist
          </h1>
          <p className="text-neutral-600">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <div className="card relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product._id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>

                  <Link to={`/product/${item.product._id}`}>
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Stock Status */}
                      {!item.product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}

                      {/* Sale Badge */}
                      {item.product.comparePrice && item.product.comparePrice > item.product.price && (
                        <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Sale
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <Link to={`/product/${item.product._id}`}>
                      <h3 className="font-heading font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors duration-200">
                        {item.product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-neutral-800">
                        ${item.product.price.toFixed(2)}
                      </span>
                      {item.product.comparePrice && item.product.comparePrice > item.product.price && (
                        <span className="text-sm text-neutral-500 line-through">
                          ${item.product.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.product.rating)
                              ? 'text-accent-500 fill-current'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-neutral-600 ml-2">
                        ({item.product.rating})
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleAddToCart(item.product)}
                        disabled={!item.product.inStock}
                        size="sm"
                        className="flex-1"
                      >
                        {item.product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveFromWishlist(item.product._id)}
                        size="sm"
                        icon={Heart}
                        className="text-red-500 border-red-300 hover:bg-red-50"
                      />
                    </div>

                    <p className="text-xs text-neutral-500">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Button as={Link} to="/shop" variant="outline" icon={ShoppingBag}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;