import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  verifyToken: () => api.get('/auth/verify'),
  updateProfile: (profileData: any) => api.put('/auth/profile', profileData),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

// Product API
export const productAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories'),
  search: (query: string) => api.get(`/products/search?q=${query}`),
  addReview: (reviewData: any) => api.post('/products/reviews', reviewData),
  getRelated: (id: string) => api.get(`/products/${id}/related`),
};

// Cart API (if using server-side cart)
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (item: any) => api.post('/cart/add', item),
  updateCart: (itemId: string, quantity: number) =>
    api.put(`/cart/update/${itemId}`, { quantity }),
  removeFromCart: (itemId: string) => api.delete(`/cart/remove/${itemId}`),
  clearCart: () => api.delete('/cart/clear'),
};

// Order API
export const orderAPI = {
  create: (orderData: any) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders/user'),
  getById: (id: string) => api.get(`/orders/${id}`),
  trackOrder: (orderNumber: string) => api.get(`/orders/track/${orderNumber}`),
  cancelOrder: (id: string) => api.put(`/orders/${id}/cancel`),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId: string) => api.post('/wishlist/add', { productId }),
  removeFromWishlist: (productId: string) =>
    api.delete(`/wishlist/remove/${productId}`),
  clearWishlist: () => api.delete('/wishlist/clear'),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (amount: number) =>
    api.post('/payment/create-intent', { amount }),
  confirmPayment: (paymentIntentId: string) =>
    api.post('/payment/confirm', { paymentIntentId }),
  applyCoupon: (code: string) => api.post('/payment/coupon', { code }),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getProducts: (params?: any) => api.get('/admin/products', { params }),
  createProduct: (productData: any) => api.post('/admin/products', productData),
  updateProduct: (id: string, productData: any) =>
    api.put(`/admin/products/${id}`, productData),
  deleteProduct: (id: string) => api.delete(`/admin/products/${id}`),
  getOrders: (params?: any) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id: string, status: string) =>
    api.put(`/admin/orders/${id}/status`, { status }),
  getCustomers: (params?: any) => api.get('/admin/customers', { params }),
  updateCustomer: (id: string, customerData: any) =>
    api.put(`/admin/customers/${id}`, customerData),
  deleteCustomer: (id: string) => api.delete(`/admin/customers/${id}`),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadMultipleImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;