import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import dishesReducer from "./slices/dishSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";
import newsReducer from "./slices/newsSlice";
import adminReducer from "./slices/adminSlice";


const store = configureStore({
    reducer: {
        accountReducer,
        dishes: dishesReducer,
        orders: orderReducer,
        payment: paymentReducer,
        news: newsReducer,
        admin: adminReducer,


    },
});

export default store;