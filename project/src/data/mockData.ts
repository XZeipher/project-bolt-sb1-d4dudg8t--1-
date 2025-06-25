// Mock data for development and demonstration
export const mockProducts = [
  {
    id: '1',
    name: 'Ethereal Silk Blouse',
    slug: 'ethereal-silk-blouse',
    description: 'A luxurious silk blouse with delicate floral embroidery, perfect for both casual and formal occasions.',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 89.99,
    comparePrice: 120.00,
    categories: ['Tops', 'Silk', 'Formal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inventory: { quantity: 25, reserved: 3 },
    rating: 4.8,
    reviews: 47,
    featured: true
  },
  {
    id: '2',
    name: 'Dreamy Cashmere Sweater',
    slug: 'dreamy-cashmere-sweater',
    description: 'Soft cashmere sweater in a beautiful pastel pink, designed for ultimate comfort and style.',
    images: [
      'https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679723/pexels-photo-7679723.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 149.99,
    comparePrice: 200.00,
    categories: ['Sweaters', 'Cashmere', 'Winter'],
    sizes: ['XS', 'S', 'M', 'L'],
    inventory: { quantity: 15, reserved: 1 },
    rating: 4.9,
    reviews: 32,
    featured: true
  },
  {
    id: '3',
    name: 'Celestial Maxi Dress',
    slug: 'celestial-maxi-dress',
    description: 'Flowing maxi dress with celestial print, perfect for summer evenings and special occasions.',
    images: [
      'https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 129.99,
    comparePrice: 180.00,
    categories: ['Dresses', 'Summer', 'Maxi'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inventory: { quantity: 20, reserved: 2 },
    rating: 4.7,
    reviews: 28,
    featured: false
  },
  {
    id: '4',
    name: 'Moonlight Denim Jacket',
    slug: 'moonlight-denim-jacket',
    description: 'Vintage-inspired denim jacket with pearl button details and embroidered moon phases.',
    images: [
      'https://images.pexels.com/photos/7679726/pexels-photo-7679726.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679727/pexels-photo-7679727.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 119.99,
    comparePrice: 160.00,
    categories: ['Jackets', 'Denim', 'Vintage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inventory: { quantity: 18, reserved: 0 },
    rating: 4.6,
    reviews: 41,
    featured: true
  },
  {
    id: '5',
    name: 'Angel Wings Cardigan',
    slug: 'angel-wings-cardigan',
    description: 'Oversized cardigan with intricate cable knit pattern, perfect for cozy autumn days.',
    images: [
      'https://images.pexels.com/photos/7679728/pexels-photo-7679728.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679729/pexels-photo-7679729.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 99.99,
    comparePrice: 140.00,
    categories: ['Cardigans', 'Knitwear', 'Autumn'],
    sizes: ['S', 'M', 'L', 'XL'],
    inventory: { quantity: 22, reserved: 1 },
    rating: 4.8,
    reviews: 35,
    featured: false
  },
  {
    id: '6',
    name: 'Stardust Mini Skirt',
    slug: 'stardust-mini-skirt',
    description: 'A-line mini skirt with subtle shimmer and star-shaped buttons, perfect for date nights.',
    images: [
      'https://images.pexels.com/photos/7679730/pexels-photo-7679730.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679731/pexels-photo-7679731.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 69.99,
    comparePrice: 95.00,
    categories: ['Skirts', 'Mini', 'Evening'],
    sizes: ['XS', 'S', 'M', 'L'],
    inventory: { quantity: 30, reserved: 2 },
    rating: 4.5,
    reviews: 23,
    featured: true
  },
  {
    id: '7',
    name: 'Cloud Nine Palazzo Pants',
    slug: 'cloud-nine-palazzo-pants',
    description: 'Flowing palazzo pants in soft chiffon, designed for comfort and elegance.',
    images: [
      'https://images.pexels.com/photos/7679732/pexels-photo-7679732.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679733/pexels-photo-7679733.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 79.99,
    comparePrice: 110.00,
    categories: ['Pants', 'Palazzo', 'Chiffon'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inventory: { quantity: 16, reserved: 0 },
    rating: 4.7,
    reviews: 19,
    featured: false
  },
  {
    id: '8',
    name: 'Fairy Tale Lace Top',
    slug: 'fairy-tale-lace-top',
    description: 'Delicate lace top with scalloped edges and pearl button closure at the back.',
    images: [
      'https://images.pexels.com/photos/7679734/pexels-photo-7679734.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679735/pexels-photo-7679735.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 94.99,
    comparePrice: 130.00,
    categories: ['Tops', 'Lace', 'Romantic'],
    sizes: ['XS', 'S', 'M', 'L'],
    inventory: { quantity: 12, reserved: 1 },
    rating: 4.9,
    reviews: 26,
    featured: true
  }
];

export const mockCategories = [
  { id: '1', name: 'Tops', count: 45, image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Dresses', count: 32, image: 'https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', name: 'Sweaters', count: 28, image: 'https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '4', name: 'Jackets', count: 21, image: 'https://images.pexels.com/photos/7679726/pexels-photo-7679726.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '5', name: 'Pants', count: 36, image: 'https://images.pexels.com/photos/7679732/pexels-photo-7679732.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '6', name: 'Skirts', count: 19, image: 'https://images.pexels.com/photos/7679730/pexels-photo-7679730.jpeg?auto=compress&cs=tinysrgb&w=400' }
];

export const mockTestimonials = [
  {
    id: '1',
    name: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'Absolutely love the quality and style of Yuri Store! The ethereal silk blouse is my favorite piece.',
    product: 'Ethereal Silk Blouse'
  },
  {
    id: '2',
    name: 'Sophia Chen',
    avatar: 'https://images.pexels.com/photos/3586799/pexels-photo-3586799.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'The cashmere sweater is incredibly soft and the perfect pastel shade. Worth every penny!',
    product: 'Dreamy Cashmere Sweater'
  },
  {
    id: '3',
    name: 'Isabella Martinez',
    avatar: 'https://images.pexels.com/photos/3586800/pexels-photo-3586800.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'Fast shipping and beautiful packaging. The celestial maxi dress fits perfectly!',
    product: 'Celestial Maxi Dress'
  },
  {
    id: '4',
    name: 'Olivia Thompson',
    avatar: 'https://images.pexels.com/photos/3586801/pexels-photo-3586801.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'Yuri Store has become my go-to for unique, high-quality pieces. Highly recommend!',
    product: 'Moonlight Denim Jacket'
  },
  {
    id: '5',
    name: 'Ava Wilson',
    avatar: 'https://images.pexels.com/photos/3586802/pexels-photo-3586802.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'The attention to detail is amazing. Love the pearl buttons on the denim jacket!',
    product: 'Angel Wings Cardigan'
  },
  {
    id: '6',
    name: 'Mia Johnson',
    avatar: 'https://images.pexels.com/photos/3586803/pexels-photo-3586803.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    text: 'Beautiful clothes that make me feel confident and elegant. Five stars!',
    product: 'Stardust Mini Skirt'
  }
];

export const mockUser = {
  id: '1',
  email: 'demo@yuristore.com',
  firstName: 'Demo',
  lastName: 'User',
  role: 'customer' as const,
  addresses: [
    {
      id: '1',
      type: 'home',
      firstName: 'Demo',
      lastName: 'User',
      street: '123 Fashion Street',
      city: 'Style City',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
      isDefault: true
    }
  ],
  orderHistory: []
};