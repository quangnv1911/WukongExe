import productService from "../services/product.js";
const getAllProduct = async (req, res, next) => {
    try {
        const products = await productService.getAllProduct(req.body);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productService.updateProduct(productId, req.body);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        await productService.updateProduct(productId, {
            isHide: true
        });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct
}
