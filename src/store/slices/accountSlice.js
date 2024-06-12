import { createSlice } from "@reduxjs/toolkit";
import accountApi from "../../api/accountApi";

const initialState = {
  currentUser: null,
  isLogin: false,
  role: "",
  username: "",
  loading: false,
  error: null,
  success: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => { },
});

export const { setRole, setIsLogin, setUsername, setLoading, setError, setSuccess } =
  accountSlice.actions;

export const changePassword = (passwordData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Thực hiện gọi API với cấu trúc params
    const response = await accountApi.changePassword(passwordData);
    dispatch(setLoading(false));
    // Xử lý kết quả thành công
    if (response && response.data && response.data._message) {
      dispatch(setSuccess(true));
      dispatch(setIsLogin(false));
    }
  } catch (error) {
    // Xử lý lỗi
    dispatch(setLoading(false));
    let errorMessage = "Đã xảy ra lỗi, vui lòng thử lại sau.";
    if (error.response && error.response.data && error.response.data._message) {
      errorMessage = error.response.data._message;
    }
    dispatch(setError(errorMessage));
  }
};

export default accountSlice.reducer;
