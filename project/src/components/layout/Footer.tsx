import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/shop?filter=new' },
      { name: 'Best Sellers', href: '/shop?filter=bestsellers' },
      { name: 'Sale', href: '/shop?filter=sale' },
      { name: 'Gift Cards', href: '/gift-cards' },
    ],
    help: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/yuristore', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/yuristore', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/yuristore', label: 'Facebook' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-gradient-to-br from-primary-50 to-accent-50 border-t border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-primary-200">
          <div className="text-center max-w-2xl mx-auto">
            <motion.h3 
              className="text-2xl font-heading font-semibold text-neutral-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Stay in the Loop
            </motion.h3>
            <motion.p 
              className="text-neutral-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
            </motion.p>
            <motion.form 
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-primary-200 to-accent-200 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-6 h-6 text-primary-700" />
              </motion.div>
              <span className="text-2xl font-heading font-bold text-neutral-800">
                Yuri Store
              </span>
            </Link>
            <p className="text-neutral-600 mb-6 max-w-sm">
              Discover premium fashion and lifestyle products that celebrate your unique style. 
              Curated collections with exceptional quality and timeless elegance.
            </p>
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>123 Fashion Street, Style City, CA 90210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@yuristore.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading font-semibold text-neutral-800 mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-heading font-semibold text-neutral-800 mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-neutral-800 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-primary-200 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-neutral-600 mb-4 md:mb-0">
            <span>© 2025 Yuri Store. Made with</span>
            <Heart className="w-4 h-4 text-secondary-500" />
            <span>for fashion lovers.</span>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;