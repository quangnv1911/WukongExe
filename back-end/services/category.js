import Category from "../models/Category.js";

export const createCategory = async (categoryData) => {
    try {
        return await Category.create(categoryData);
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllCategories = async () => {
    try {
        return await Category.find();
    } catch (error) {
        throw new Error(error);
    }
};

export const getCategoryById = async (categoryId) => {
    try {
        return await Category.findById(categoryId);
    } catch (error) {
        throw new Error(error);
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        return await Category.findByIdAndDelete(categoryId);
    } catch (error) {
        throw new Error(error);
    }
};
