import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X,
  Heart,
  Star,
  LogOut
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import { toggleMobileMenu, closeMobileMenu, toggleSearch, closeSearch } from '../../store/slices/uiSlice';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isMobileMenuOpen, isSearchOpen } = useAppSelector((state) => state.ui);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?filter=new' },
    { name: 'Sale', href: '/shop?filter=sale' },
  ];

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
    dispatch(closeMobileMenu());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeMobileMenu());
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      dispatch(closeSearch());
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeSearch());
        dispatch(closeMobileMenu());
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch]);

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={() => dispatch(closeMobileMenu())}>
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-primary-200 to-accent-200 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-6 h-6 text-primary-700" />
              </motion.div>
              <span className="text-2xl font-heading font-bold text-neutral-800">
                Yuri Store
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <motion.button
                onClick={() => dispatch(toggleSearch())}
                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <motion.div 
                  className="relative p-2 text-neutral-600 hover:text-secondary-500 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {wishlistItems.length}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.div 
                  className="relative p-2 text-neutral-600 hover:text-accent-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  onClick={handleAuthClick}
                  className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => dispatch(toggleMobileMenu())}
                className="md:hidden p-2 text-neutral-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden glass border-t border-primary-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block py-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block py-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200 font-medium"
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 py-2 text-secondary-600 hover:text-secondary-700 transition-colors duration-200 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="block py-2 text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium"
                    onClick={() => dispatch(closeMobileMenu())}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeSearch())}
          >
            <motion.div
              className="bg-white p-6 rounded-b-3xl"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="flex items-center space-x-4">
                  <Search className="w-6 h-6 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-lg border-none outline-none bg-transparent"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => dispatch(closeSearch())}
                    className="p-2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;