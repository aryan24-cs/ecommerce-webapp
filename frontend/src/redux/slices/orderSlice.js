import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
    orders: [],
    order: null,
    allOrders: [],
    loading: false,
    error: null,
    success: false,
};

// Create new order
export const createOrder = createAsyncThunk(
    'order/create',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await api.post('/order/new', orderData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create order');
        }
    }
);

// Get my orders
export const getMyOrders = createAsyncThunk(
    'order/myOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/orders/me');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

// Get order details
export const getOrderDetails = createAsyncThunk(
    'order/details',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/order/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
        }
    }
);

// Admin: Get all orders
export const getAllOrders = createAsyncThunk(
    'order/allOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/admin/orders');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

// Admin: Update order status
export const updateOrderStatus = createAsyncThunk(
    'order/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/order/${id}`, { status });
            return { id, status };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update order');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
        resetOrderSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload.order;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get my orders
            .addCase(getMyOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get order details
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.order = action.payload.order;
            })
            // Admin: Get all orders
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.allOrders = action.payload.orders;
            })
            // Admin: Update order status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.allOrders.findIndex(o => o._id === action.payload.id);
                if (index !== -1) {
                    state.allOrders[index].orderStatus = action.payload.status;
                }
            });
    },
});

export const { clearOrderError, resetOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer;
