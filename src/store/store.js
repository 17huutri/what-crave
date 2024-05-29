import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import dishesReducer from "./slices/dishSlice";

const store = configureStore({
    reducer: {
        accountReducer,
        dishes: dishesReducer,

    },
});

export default store;