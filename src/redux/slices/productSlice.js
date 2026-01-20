import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ limit = 30, skip = 0, category = '' }, { rejectWithValue }) => {
        try {
            let url = `/products?limit=${limit}&skip=${skip}`;
            if (category && category !== 'all') {
                url = `/products/category/${category}?limit=${limit}&skip=${skip}`;
            }
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/products/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    total: 0,
    categories: [],
    status: 'idle',
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.products;
                state.total = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            });
    },
});

export default productSlice.reducer;
