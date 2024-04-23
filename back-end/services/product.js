import Product from "../models/Product.js";
const createProduct = async (productData) => {
    try {
        return await Product.create(productData);
    } catch (error) {
        throw new Error(error);
    }
};

const updateProduct = async (productId, productData) => {
    try {
        return await Product.findByIdAndUpdate(productId, productData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteProduct = async (productId) => {
    try {
        return await Product.findByIdAndDelete(productId);
    } catch (error) {
        throw new Error(error);
    }
};

const getAllProduct = async () => {
    try {
        return await Product.find({});
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct
}