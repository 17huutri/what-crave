import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import dishesReducer from "./slices/dishSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";


const store = configureStore({
    reducer: {
        accountReducer,
        dishes: dishesReducer,
        orders: orderReducer,
        payment: paymentReducer,

    },
});

export default store;