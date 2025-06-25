import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Star, Mail, Lock, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser, registerUser, clearError } from '../store/slices/authSlice';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: ''
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        })).unwrap();
        toast.success('Welcome back!');
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        await dispatch(registerUser({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        })).unwrap();
        toast.success('Account created successfully!');
      }
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) {
      dispatch(clearError());
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: ''
    });
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <motion.div
          className="glass rounded-3xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-primary-200 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-8 h-8 text-primary-700" />
            </motion.div>
            <h2 className="text-2xl font-heading font-bold text-neutral-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-neutral-600 mt-2">
              {isLogin 
                ? 'Sign in to your Yuri Store account' 
                : 'Join the Yuri Store community'
              }
            </p>
          </div>

          {/* Auth Toggle */}
          <div className="flex bg-primary-50 rounded-2xl p-1 mb-8">
            <button
              onClick={() => !isLogin && toggleMode()}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => isLogin && toggleMode()}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-primary-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    required={!isLogin}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    icon={User}
                    placeholder="John"
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    required={!isLogin}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    icon={User}
                    placeholder="Doe"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Input
              label="Email Address"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              icon={Mail}
              placeholder="john@example.com"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                icon={Lock}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    icon={Lock}
                    placeholder="••••••••"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-300 text-primary-500 focus:ring-primary-300"
                  />
                  <span className="ml-2 text-sm text-neutral-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {/* Demo Account */}
          <div className="mt-6 p-4 bg-accent-50 rounded-2xl">
            <p className="text-sm text-neutral-600 text-center mb-2">
              Demo Account
            </p>
            <div className="text-xs text-neutral-500 text-center space-y-1">
              <p>Email: demo@yuristore.com</p>
              <p>Password: demo123</p>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors">
                <span className="text-sm font-medium text-neutral-700">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors">
                <span className="text-sm font-medium text-neutral-700">Apple</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;