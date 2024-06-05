import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (page) => {
    const response = await axios.get(`https://themgico_node.nguyenminhhai.us/api/order?page=${page}&limit=5`);
    return response.data;
});

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderID) => {
    const response = await axios.get(`https://themgico_node.nguyenminhhai.us/api/order/${orderID}`);
    return response.data;
});

export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ orderID, ...data }) => {
    const response = await axios.put(`https://themgico_node.nguyenminhhai.us/api/order/updateOrder/${orderID}`, data);
    return response.data;
});

export const updateMode = createAsyncThunk('orders/updateMode', async ({ orderID, mode }) => {
    const response = await axios.put(`https://themgico_node.nguyenminhhai.us/api/order/${orderID}`, { mode });
    return response.data;
});

export const createOrderDetail = createAsyncThunk('orderDetails/createOrderDetail', async ({ orderID, productID, quantity }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://themgico_node.nguyenminhhai.us/api/order-detail/${orderID}`, {
            productID,
            quantity
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        order: {
            orderDetails: []
        },
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        error: null,
    },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload.listOrders;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.isLoading = false;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.order = action.payload.order;
                state.isLoading = false;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.order = action.payload.order;
                state.isLoading = false;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateMode.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMode.fulfilled, (state, action) => {
                if (state.order) {
                    state.order.mode = action.meta.arg.mode;
                }
                state.isLoading = false;
            })
            .addCase(updateMode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(createOrderDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOrderDetail.fulfilled, (state, action) => {
                if (state.order) {
                    state.order.orderDetails.push(action.payload.orderDetail);
                    state.order.status = action.payload.status;
                }
                state.isLoading = false;
            })
            .addCase(createOrderDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage } = orderSlice.actions;
export default orderSlice.reducer;
