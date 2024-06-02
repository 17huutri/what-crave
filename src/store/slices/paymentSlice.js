import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPayment, payPayment, cancelPayment, getListPayment } from '../../api/paymentApi';

export const createPaymentAsync = createAsyncThunk(
    'payment/createPayment',
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await createPayment(paymentData);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const payPaymentAsync = createAsyncThunk(
    'payment/payPayment',
    async ({ paymentID, paymentMethod }, { rejectWithValue }) => {
        try {
            const response = await payPayment(paymentID, paymentMethod);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const cancelPaymentAsync = createAsyncThunk(
    'payment/cancelPayment',
    async (paymentID, { rejectWithValue }) => {
        try {
            const response = await cancelPayment(paymentID);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getListPaymentAsync = createAsyncThunk(
    'payment/getListPayment',
    async ({ currentPage = 1, perPage = 5 }, { rejectWithValue }) => {
        try {
            const response = await getListPayment(currentPage, perPage);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: {
            currentPage: 1,
            totalPages: 1,
            listPayments: [],
        },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
            })
            .addCase(createPaymentAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(payPaymentAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(payPaymentAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
            })
            .addCase(payPaymentAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(cancelPaymentAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelPaymentAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
            })
            .addCase(cancelPaymentAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getListPaymentAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListPaymentAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.payment.listPayments = action.payload.listPayments;
                state.payment.currentPage = action.payload.currentPage;
                state.payment.totalPages = action.payload.totalPages;
            })
            .addCase(getListPaymentAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default paymentSlice.reducer;
