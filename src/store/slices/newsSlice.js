import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsApi from "../../api/newsApi";

const initialState = {
    news: [],
    loading: false,
    error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
    try {
        const response = await newsApi.getAllNews();
        return response.data._data;
    } catch (error) {
        throw error;
    }
});


const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default newsSlice.reducer;
