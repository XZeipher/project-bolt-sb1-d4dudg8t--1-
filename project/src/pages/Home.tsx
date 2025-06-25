import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFeaturedProducts, fetchCategories } from '../store/slices/productSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { featuredProducts, categories } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Star, label: 'Average Rating', value: '4.9' },
    { icon: Award, label: 'Awards Won', value: '15+' },
    { icon: TrendingUp, label: 'Growth Rate', value: '200%' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Emma Rodriguez',
      avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'Absolutely love the quality and style of Yuri Store! The ethereal silk blouse is my favorite piece.',
    },
    {
      id: 2,
      name: 'Sophia Chen',
      avatar: 'https://images.pexels.com/photos/3586799/pexels-photo-3586799.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'The cashmere sweater is incredibly soft and the perfect pastel shade. Worth every penny!',
    },
    {
      id: 3,
      name: 'Isabella Martinez',
      avatar: 'https://images.pexels.com/photos/3586800/pexels-photo-3586800.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 5,
      text: 'Fast shipping and beautiful packaging. The celestial maxi dress fits perfectly!',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-accent-50 to-secondary-100" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7679800/pexels-photo-7679800.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-accent-600" />
              <span className="text-neutral-700 font-medium">New Collection Available</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-neutral-800 mb-6 leading-tight">
              Discover Your
              <span className="block text-gradient">
                Perfect Style
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Curated fashion pieces that celebrate your individuality. From ethereal silks to dreamy cashmeres, 
              find pieces that make you feel extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/shop"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/shop?filter=new"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Star className="w-5 h-5" />
                  <span>New Arrivals</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-60"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-full opacity-60"
          animate={{ 
            y: [0, 20, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-neutral-800 mb-2">
                  {stat.value}
                </h3>
                <p className="text-neutral-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
              Featured Collections
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Handpicked pieces that embody elegance and contemporary style. Each item is carefully selected 
              for its quality, design, and ability to make you feel confident.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product._id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[3/4]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {product.comparePrice && product.comparePrice > product.price && (
                      <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sale
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors duration-200">
                      {product.name}
                    </h3>
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/shop"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our carefully curated categories, each designed to help you find exactly what you're looking for.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/shop?category=${category.toLowerCase()}`}>
                  <div className="relative overflow-hidden rounded-3xl aspect-square">
                    <img
                      src={`https://images.pexels.com/photos/767679${index + 20}/pexels-photo-767679${index + 20}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-xl font-heading font-bold mb-1">{category}</h3>
                      <p className="text-sm opacity-90">Explore collection</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our amazing customers have to say about their Yuri Store experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-neutral-800">{testimonial.name}</p>
                    <p className="text-sm text-neutral-600">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;