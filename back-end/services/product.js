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
        // find All product that not hide
        const products = await Product.find({
            $or: [
                { isHide: false },
                { isHide: { $exists: false } }
            ]
        }).populate('category', 'name');
        var newProducts = products.map(product => {
            product._doc.categoryId = product._doc.category._id;
            product._doc.category = product._doc.category.name;

            return product;
        })
        return newProducts;
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