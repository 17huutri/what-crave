import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dishApi from "../../api/dishApi";

export const fetchCatalog = createAsyncThunk(
    'dishes/fetchCatalog',
    async (_, { rejectWithValue }) => {
        try {
            const response = await dishApi.getCatalog();
            return response.data._data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {
        catalog: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatalog.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCatalog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.catalog = action.payload;
            })
            .addCase(fetchCatalog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});


export default dishesSlice.reducer;
