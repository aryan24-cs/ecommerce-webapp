import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
};

// Get cart
export const getCart = createAsyncThunk(
    'cart/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/cart');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

// Add to cart
export const addToCart = createAsyncThunk(
    'cart/add',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await api.post('/cart/add', { productId, quantity });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
        }
    }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/cart/remove/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Get cart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.cart?.cartItems || [];
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add to cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cart?.cartItems || [];
            })
            // Remove from cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.cart?.cartItems || [];
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
