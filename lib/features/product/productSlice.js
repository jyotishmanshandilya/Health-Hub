import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    products: [],
    isError: false,
}

// Action
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    const response = await fetch('/api/products');
    return response.json();
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;

            // reset the products state, before appending the new data
            state.products = [];
            
            const productData = action.payload;

            // getting all the productids
            let allProductIds = [];
            for(let product of productData){
                allProductIds.push(product.productid);
            }
            let uniqueProductIds = [...new Set(allProductIds)]

            // filtering the data ans storing it in the required format
            for(let id of uniqueProductIds){
                let p = productData.find((product) => product.productid == id)
                let product = {
                    productid: id,
                    productTitle: p.producttitle,
                    productDescription: p.productdesc,
                    category: p.categoryid,
                    productitems: productData.filter((product) => product.productid == id) ,
                };
                state.products.push(product);
            }
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Error in fetching: ", action.payload);
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default productSlice.reducer;

