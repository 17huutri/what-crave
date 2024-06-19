import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import accountApi from '../../api/accountApi';
import dishApi from '../../api/dishApi';
import categoryApi from '../../api/categoryApi';
import newsApi from '../../api/newsApi';

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async () => {
    const response = await userApi.getAllUsers();
    return response.data._data;
});

export const updateUserStatus = createAsyncThunk('admin/updateUserStatus', async ({ id, params }, { dispatch }) => {
    const response = await userApi.updateStatus(id, params);
    dispatch(fetchAllUsers());

    return response.data;
});

export const createStaffAccount = createAsyncThunk('admin/createStaffAccount', async (params, { dispatch }) => {
    const response = await accountApi.createAccountStaff(params);
    dispatch(fetchAllUsers());

    return response.data;
});

// Products
export const fetchCatalog = createAsyncThunk('admin/fetchCatalog', async () => {
    const response = await dishApi.getCatalog();
    return response.data._data;
});

export const createProduct = createAsyncThunk('admin/createProduct', async (data, { dispatch }) => {
    const response = await dishApi.createProduct(data);
    dispatch(fetchCatalog());

    return response.data;
});

export const updateProduct = createAsyncThunk('admin/updateProduct', async (data, { dispatch }) => {
    const response = await dishApi.updateProduct(data);
    dispatch(fetchCatalog());

    return response.data;
});

export const deleteProduct = createAsyncThunk('admin/deleteProduct', async (id) => {
    await dishApi.deleteProduct(id);
    return id;
});

export const updateProductStatus = createAsyncThunk('admin/updateProductStatus', async ({ id, status }) => {
    const response = await dishApi.updateProductStatus(id, status);
    return response.data;
});

//category
export const fetchAllCategories = createAsyncThunk('admin/fetchAllCategories', async () => {
    const response = await categoryApi.getAllCategories();
    return response.data._data;
});

export const createCategory = createAsyncThunk('admin/createCategory', async (data, { dispatch }) => {
    const response = await categoryApi.createCategory(data);
    dispatch(fetchAllCategories());
    return response.data;
});

export const updateCategory = createAsyncThunk('admin/updateCategory', async (data, { dispatch }) => {
    const response = await categoryApi.updateCategory(data);
    dispatch(fetchAllCategories());
    return response.data;
});





export const deleteCategory = createAsyncThunk('admin/deleteCategory', async (id) => {
    await categoryApi.deleteCategory(id);
    return id;
});
//news
export const fetchAllNews = createAsyncThunk('admin/fetchAllNews', async () => {
    const response = await newsApi.getAllNews();
    return response.data._data;
});

export const createNews = createAsyncThunk('admin/createNews', async (data, { dispatch }) => {
    const response = await newsApi.createNews(data);
    // dispatch(fetchAllNews());
    return response.data;
});

export const updateNews = createAsyncThunk('admin/updateNews', async (data, { dispatch }) => {
    const response = await newsApi.updateNews(data);
    dispatch(fetchAllNews());
    return response.data;
});

export const deleteNews = createAsyncThunk('admin/deleteNews', async (id, { dispatch }) => {
    await newsApi.deleteNews(id);
    dispatch(fetchAllNews());
    return id;
});
const initialState = {
    users: [],
    products: [],
    categories: [],
    news: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // reducers users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createStaffAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStaffAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createStaffAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // reducers products
            .addCase(fetchCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCatalog.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchCatalog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex(product => product.id === updatedProduct.id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProductStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProductStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Category reducers
            .addCase(fetchAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCategory = action.payload;
                const index = state.categories.findIndex(category => category.id === updatedCategory.id);
                if (index !== -1) {
                    state.categories[index] = updatedCategory;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(category => category.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // News Reducers
            .addCase(fetchAllNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchAllNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news.push(action.payload);
            })
            .addCase(createNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateNews.fulfilled, (state, action) => {
                state.loading = false;
                const updatedNews = action.payload;
                const index = state.news.findIndex(news => news.id === updatedNews.id);
                if (index !== -1) {
                    state.news[index] = updatedNews;
                }
            })
            .addCase(updateNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = state.news.filter(news => news.id !== action.payload);
            })
            .addCase(deleteNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },
});

export default adminSlice.reducer;