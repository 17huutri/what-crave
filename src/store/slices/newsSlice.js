import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsApi from "../../api/newsApi";

const initialState = {
    news: [],
    newsDetail: null,
    loading: false,
    loadingDetail: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
};

export const fetchNews = createAsyncThunk(
    "news/fetchNews",
    async () => {
        try {
            const response = await newsApi.getAllNews();
            const totalPages = Math.ceil(response.data._data.length / 12);
            return { data: response.data._data, totalPages };
        } catch (error) {
            throw error;
        }
    }
);

export const fetchNewsDetail = createAsyncThunk(
    "news/fetchNewsDetail",
    async (id) => {
        try {
            const response = await newsApi.getNewsById(id);
            return response.data._data;
        } catch (error) {
            throw error;
        }
    }
);
export const createNews = createAsyncThunk(
    "news/createNews",
    async (data) => {
        try {
            const response = await newsApi.createNews(data);
            return response.data._data;
        } catch (error) {
            throw error;
        }
    }
)

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setPage(state, action) {
            state.currentPage = action.payload;
        },
        clearNewsDetail(state) {
            state.newsDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload.data;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchNewsDetail.pending, (state) => {
                state.loadingDetail = true;
                state.error = null;
            })
            .addCase(fetchNewsDetail.fulfilled, (state, action) => {
                state.loadingDetail = false;
                state.newsDetail = action.payload;
            })
            .addCase(fetchNewsDetail.rejected, (state, action) => {
                state.loadingDetail = false;
                state.error = action.error.message;
            });
    },
});

export const { setPage, clearNewsDetail } = newsSlice.actions;

export default newsSlice.reducer;
