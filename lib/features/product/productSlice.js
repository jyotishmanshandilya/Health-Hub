import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    products: [],
    productitems: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        allProducts: (state, action) => {
            
        } 
    }
})

export const { allProducts } = productSlice.actions;

export default productSlice.reducer;

