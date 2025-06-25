import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  maxQuantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  tax: number;
  discount: number;
  couponCode: string | null;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  totalItems: 0,
  totalPrice: 0,
  shippingCost: 0,
  tax: 0,
  discount: 0,
  couponCode: null,
};

// Calculate totals
const calculateTotals = (state: CartState) => {
  state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  state.shippingCost = state.totalPrice > 100 ? 0 : 9.99;
  state.tax = state.totalPrice * 0.08;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId && 
                item.size === action.payload.size && 
                item.color === action.payload.color
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.maxQuantity) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action: PayloadAction<{
      productId: string;
      size: string;
      color: string;
    }>) => {
      state.items = state.items.filter(
        item => !(item.productId === action.payload.productId && 
                 item.size === action.payload.size && 
                 item.color === action.payload.color)
      );
      
      calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action: PayloadAction<{
      productId: string;
      size: string;
      color: string;
      quantity: number;
    }>) => {
      const item = state.items.find(
        item => item.productId === action.payload.productId && 
                item.size === action.payload.size && 
                item.color === action.payload.color
      );

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            i => !(i.productId === action.payload.productId && 
                  i.size === action.payload.size && 
                  i.color === action.payload.color)
          );
        } else {
          item.quantity = Math.min(action.payload.quantity, item.maxQuantity);
        }
      }

      calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.shippingCost = 0;
      state.tax = 0;
      state.discount = 0;
      state.couponCode = null;
      localStorage.removeItem('cart');
    },
    
    applyCoupon: (state, action: PayloadAction<{
      code: string;
      discount: number;
    }>) => {
      state.couponCode = action.payload.code;
      state.discount = action.payload.discount;
    },
    
    removeCoupon: (state) => {
      state.couponCode = null;
      state.discount = 0;
    },
  },
});

// Calculate initial totals
calculateTotals(initialState);

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;