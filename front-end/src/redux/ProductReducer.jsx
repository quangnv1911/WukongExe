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
            const { _id, image, name, price, category, quantity } = action.payload;
            const indexP = state.products.findIndex(sp => sp._id === _id);
            state.products.length === 0 || indexP === -1
                ? state.products.push(action.payload)
                : state.products[indexP].quantity = state.products[indexP].quantity + quantity;
        }

    }
})
export const { addProduct, addKeySearch } = ProductSlide.actions;
export default ProductSlide.reducer;