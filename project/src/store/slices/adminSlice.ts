import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAPI } from '../../services/api';

interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  recentOrders: any[];
  topProducts: any[];
  salesData: any[];
}

interface AdminState {
  stats: AdminStats | null;
  products: any[];
  orders: any[];
  customers: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  stats: null,
  products: [],
  orders: [],
  customers: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getStats();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const fetchAdminProducts = createAsyncThunk(
  'admin/fetchProducts',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getProducts(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchAdminOrders = createAsyncThunk(
  'admin/fetchOrders',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getOrders(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchAdminCustomers = createAsyncThunk(
  'admin/fetchCustomers',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getCustomers(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stats
      .addCase(fetchAdminStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Products
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      // Fetch Orders
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      })
      // Fetch Customers
      .addCase(fetchAdminCustomers.fulfilled, (state, action) => {
        state.customers = action.payload.customers;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;