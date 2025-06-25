import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Ruler,
  Check,
  X
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProductById, addProductReview } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist } from '../store/slices/wishlistSlice';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
  });

  const dispatch = useAppDispatch();
  const { currentProduct: product, isLoading } = useAppSelector((state) => state.products);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      if (product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-4">
            Product not found
          </h2>
          <Link 
            to="/shop"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      maxQuantity: product.inventory.quantity
    }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }

    dispatch(addProductReview({
      productId: product._id,
      rating: reviewData.rating,
      comment: reviewData.comment,
    }));

    setShowReviewForm(false);
    setReviewData({ rating: 5, comment: '' });
    toast.success('Review submitted successfully!');
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary-600">Shop</Link>
            <span>/</span>
            <span className="text-neutral-800">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="relative aspect-square rounded-3xl overflow-hidden bg-primary-50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {product.comparePrice && product.comparePrice > product.price && (
                <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
                </div>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-primary-500' 
                        : 'border-transparent hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral-800 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-accent-500 fill-current'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                  <span className="text-neutral-600 ml-2">
                    {product.rating} ({product.reviews.length} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-neutral-800">
                  ${product.price.toFixed(2)}
                </span>
                {product.comparePrice && product.comparePrice > product.price && (
                  <span className="text-xl text-neutral-500 line-through">
                    ${product.comparePrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-neutral-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </motion.div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-lg font-semibold text-neutral-800">
                    Size
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <Ruler className="w-4 h-4" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl border transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-300 hover:shadow-sm'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-lg font-semibold text-neutral-800 mb-4">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-xl border transition-all duration-200 ${
                        selectedColor === color
                          ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-primary-300 hover:shadow-sm'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block text-lg font-semibold text-neutral-800 mb-4">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-neutral-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-primary-50 transition-colors rounded-l-xl"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory.quantity, quantity + 1))}
                    className="p-3 hover:bg-primary-50 transition-colors rounded-r-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-neutral-600">
                  {product.inventory.quantity} in stock
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                onClick={handleAddToCart}
                icon={ShoppingBag}
                className="flex-1"
              >
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={handleAddToWishlist}
                icon={Heart}
                className="sm:w-auto"
              >
                <span className="hidden sm:inline">Wishlist</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={shareProduct}
                icon={Share2}
                className="sm:w-auto"
              >
                <span className="hidden sm:inline">Share</span>
              </Button>
            </motion.div>

            {/* Product Features */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-primary-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">Free Shipping</p>
                  <p className="text-sm text-neutral-600">On orders over $100</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">Easy Returns</p>
                  <p className="text-sm text-neutral-600">30 day return policy</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">Secure Payment</p>
                  <p className="text-sm text-neutral-600">SSL encrypted checkout</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.section
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-800">
              Customer Reviews ({product.reviews.length})
            </h2>
            {isAuthenticated && (
              <Button
                onClick={() => setShowReviewForm(true)}
                variant="outline"
              >
                Write a Review
              </Button>
            )}
          </div>

          {/* Review Form Modal */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReviewForm(false)}
              >
                <motion.div
                  className="card max-w-md w-full"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-heading font-bold text-neutral-800">
                      Write a Review
                    </h3>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="p-2 text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Rating
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setReviewData({ ...reviewData, rating })}
                            className={`p-1 ${
                              rating <= reviewData.rating ? 'text-accent-500' : 'text-neutral-300'
                            }`}
                          >
                            <Star className="w-6 h-6 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Comment
                      </label>
                      <textarea
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Share your thoughts about this product..."
                        required
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Submit Review
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews List */}
          <div className="space-y-6">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review._id} className="card">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.user.avatar || `https://ui-avatars.com/api/?name=${review.user.firstName}+${review.user.lastName}&background=FF69B4&color=fff`}
                      alt={`${review.user.firstName} ${review.user.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-neutral-800">
                          {review.user.firstName} {review.user.lastName}
                        </h4>
                        {review.verified && (
                          <span className="flex items-center space-x-1 text-green-600 text-sm">
                            <Check className="w-4 h-4" />
                            <span>Verified Purchase</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-accent-500 fill-current'
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-neutral-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-neutral-700 leading-relaxed">
                        {review.comment}
                      </p>
                      
                      {review.images && review.images.length > 0 && (
                        <div className="flex space-x-2 mt-4">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  No reviews yet
                </h3>
                <p className="text-neutral-600">
                  Be the first to review this product!
                </p>
              </div>
            )}
          </div>
        </motion.section>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              className="card max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-heading font-bold text-neutral-800 mb-4">
                Size Guide
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="font-semibold">Size</div>
                  <div className="font-semibold">Bust</div>
                  <div className="font-semibold">Waist</div>
                  <div className="font-semibold">Hip</div>
                  
                  <div>XS</div><div>32"</div><div>24"</div><div>34"</div>
                  <div>S</div><div>34"</div><div>26"</div><div>36"</div>
                  <div>M</div><div>36"</div><div>28"</div><div>38"</div>
                  <div>L</div><div>38"</div><div>30"</div><div>40"</div>
                  <div>XL</div><div>40"</div><div>32"</div><div>42"</div>
                </div>
                <p className="text-sm text-neutral-600">
                  Measurements are in inches. For the best fit, we recommend measuring yourself 
                  and comparing to our size chart.
                </p>
              </div>
              <Button
                onClick={() => setShowSizeGuide(false)}
                className="w-full mt-6"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;