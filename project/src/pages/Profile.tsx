import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  MapPin, 
  CreditCard,
  Bell,
  LogOut,
  Edit3,
  Plus,
  Eye
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout, updateProfile } from '../store/slices/authSlice';
import { fetchUserOrders } from '../store/slices/orderSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSaveProfile = async () => {
    try {
      await dispatch(updateProfile(profileData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleCancelEdit = () => {
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

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
            My Account
          </h1>
          <p className="text-neutral-600">
            Manage your profile, orders, and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="card">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary-700" />
                </div>
                <h3 className="font-heading font-semibold text-neutral-800">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-neutral-600 text-sm">{user?.email}</p>
              </div>

              {/* Navigation */}
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
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-secondary-600 hover:bg-secondary-50 hover:text-secondary-700 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-bold text-neutral-800">
                      Profile Information
                    </h2>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        icon={Edit3}
                        onClick={() => setIsEditing(true)}
                        size="sm"
                      >
                        Edit
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          size="sm"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveProfile}
                          size="sm"
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      disabled={!isEditing}
                    />
                    
                    <Input
                      label="Last Name"
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      disabled={!isEditing}
                    />
                    
                    <Input
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                    
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Add phone number"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                    Order History
                  </h2>
                  
                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="border border-neutral-200 rounded-2xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-neutral-800">
                                Order #{order.orderNumber}
                              </h3>
                              <p className="text-sm text-neutral-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-neutral-800">
                                ${order.totalAmount.toFixed(2)}
                              </p>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-neutral-100 text-neutral-600'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <img
                                  key={index}
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-10 h-10 rounded-lg object-cover border-2 border-white"
                                />
                              ))}
                              {order.items.length > 3 && (
                                <div className="w-10 h-10 rounded-lg bg-neutral-100 border-2 border-white flex items-center justify-center">
                                  <span className="text-xs font-medium text-neutral-600">
                                    +{order.items.length - 3}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <p className="text-sm text-neutral-600">
                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                              </p>
                            </div>
                            
                            <Button
                              variant="outline"
                              icon={Eye}
                              size="sm"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-primary-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        When you place your first order, it will appear here.
                      </p>
                      <Button onClick={() => window.location.href = '/shop'}>
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                    Wishlist
                  </h2>
                  
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-secondary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      Save items you love to your wishlist for easy access later.
                    </p>
                    <Button onClick={() => window.location.href = '/shop'}>
                      Browse Products
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-bold text-neutral-800">
                      Saved Addresses
                    </h2>
                    <Button icon={Plus} size="sm">
                      Add Address
                    </Button>
                  </div>
                  
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-accent-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      No addresses saved
                    </h3>
                    <p className="text-neutral-600">
                      Add an address for faster checkout.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-bold text-neutral-800">
                      Payment Methods
                    </h2>
                    <Button icon={Plus} size="sm">
                      Add Card
                    </Button>
                  </div>
                  
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-accent-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      No payment methods saved
                    </h3>
                    <p className="text-neutral-600">
                      Add a payment method for faster checkout.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-neutral-800 mb-6">
                    Account Settings
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-neutral-600" />
                        <div>
                          <h3 className="font-semibold text-neutral-800">Email Notifications</h3>
                          <p className="text-sm text-neutral-600">Receive updates about your orders</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-neutral-600" />
                        <div>
                          <h3 className="font-semibold text-neutral-800">Marketing Emails</h3>
                          <p className="text-sm text-neutral-600">Receive promotional offers and updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;