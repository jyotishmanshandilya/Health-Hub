import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './features/user/userApi'
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice";
import { productApi } from './features/product/productApi';

export const store =  configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware)
})

setupListeners(store.dispatch)