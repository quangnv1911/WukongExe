import Product from "../models/Product.js";

export const createProduct = async (productData) => {
    try {
        return await Product.create(productData);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        return await Product.findByIdAndUpdate(productId, productData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteProduct = async (productId) => {
    try {
        return await Product.findByIdAndDelete(productId);
    } catch (error) {
        throw new Error(error);
    }
};

