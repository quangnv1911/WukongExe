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
                : state.products[indexP].quantity = quantity + 1;
        },
        subProduct: (state, action) => {
            const { _id, image, name, price, category } = action.payload;
            const indexP = state.products.findIndex(sp => sp._id === _id);
            (state.products[indexP].quantity - 1 < 1)
                ? state.products.splice(indexP, 1)
                : state.products[indexP].quantity -= 1;
        },
        clearProduct: (state, action) => {
            state.products = [];
        }

    }
})
export const { addProduct, addKeySearch, subProduct, clearProduct} = ProductSlide.actions;
export default ProductSlide.reducer;