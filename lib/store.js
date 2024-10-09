import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './features/user/userApi'
import productReducer from "./features/product/productSlice";
import userReducer from "./features/user/userSlice";

export const store =  configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(userApi.middleware)
})

setupListeners(store.dispatch)