import mongoose, { Schema } from "mongoose";
import Category from "./Category.js";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    importPrice: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    discountTime: {
        type: Date
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: Category,
        required: true
    },
    subcription: {
        type: String,
    },
    isCombo: {
        type: Boolean,
        default: false
    },
    isHide: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('products', productSchema);
export default Product;