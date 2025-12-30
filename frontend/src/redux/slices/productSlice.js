import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

// Get all products
export const getProducts = createAsyncThunk(
    'products/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

// Get single product
export const getProductDetails = createAsyncThunk(
    'products/getDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/product/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
        }
    }
);

// Create product (Admin)
export const createProduct = createAsyncThunk(
    'products/create',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await api.post('/admin/product/new', productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

// Update product (Admin)
export const updateProduct = createAsyncThunk(
    'products/update',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/product/${id}`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

// Delete product (Admin)
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/product/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductError: (state) => {
            state.error = null;
        },
        clearProductDetails: (state) => {
            state.product = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get all products
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get product details
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload.product);
            })
            // Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload.product._id);
                if (index !== -1) {
                    state.products[index] = action.payload.product;
                }
            })
            // Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            });
    },
});

export const { clearProductError, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
