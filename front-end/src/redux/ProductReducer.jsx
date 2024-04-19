import { createSlice } from '@reduxjs/toolkit'

const ProductSlide = createSlice({
    name: "product",
    initialState: {
        search: "",
        products: []
    },
    reducers: {
        addKeySearch: (state, action) => {
            state.search = action.payload;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        }
        
    }
})
export const { addProduct,addKeySearch} = ProductSlide.actions;
export default ProductSlide.reducer;