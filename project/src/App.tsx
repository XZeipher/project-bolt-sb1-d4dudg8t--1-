import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import OrderTracking from './pages/OrderTracking';
import Admin from './pages/admin/Admin';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Hooks
import { useAppSelector } from './hooks/redux';

function App() {
  const { isLoading } = useAppSelector((state) => state.ui);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 font-body">
        <Header />
        
        <AnimatePresence mode="wait">
          <motion.main 
            className="min-h-screen pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/track-order/:orderId" element={<OrderTracking />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/customers" element={<AdminCustomers />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        
        <Footer />
        
        {/* Loading Overlay */}
        {isLoading && <LoadingSpinner />}
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#FFF0F8',
              color: '#404040',
              borderRadius: '0.75rem',
              border: '1px solid #FFE1F1'
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;