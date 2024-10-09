import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import { userApi } from "./features/user/userApi";

const rootReducer = combineReducers({
    product: productReducer,
    [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;