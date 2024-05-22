import productService from "../services/product.js";
const getAllProduct = async (req, res, next) => {
    try {
        const { role } = req.query;
        const products = await productService.getAllProduct(role);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    try {
        const {
            name,
            importPrice,
            sellPrice,
            discount,
            discountTime,
            isCombo,
            subdescription,
            category,
            quantity
        } = req.body;
        console.log('req.file', req.file);
        const image = req.file.path;
        const product = await productService.createProduct({
            name,
            importPrice,
            sellPrice,
            discount,
            discountTime,
            isCombo: isCombo === 'true' ? true : false,
            subdescription,
            category,
            image: image,
            quantity
        });
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const {
            name,
            importPrice,
            sellPrice,
            discount,
            discountTime,
            isCombo,
            subdescription,
            category,
            quantity
        } = req.body;
        var updateProduct2 = {
            name,
            importPrice,
            sellPrice,
            discount,
            discountTime,
            isCombo: isCombo === 'true' ? true : false,
            subdescription,
            category,
            quantity
        }
        if (updateProduct2.discountTime === 'null') {
            updateProduct2.discountTime = null;
        }

        if (updateProduct2.subdescription === 'undefined') {
            updateProduct2.subdescription = null;
        }
        console.log('req.file', req.file);
        if (req.file) {
            updateProduct2.image = req.file.path;
        }

        const product = await productService.updateProduct(productId, updateProduct2);
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

const checkProductQuantity = async (req, res, next) => {
    try {
        const { postData } = req.body;
        const { listCart } = postData;

        const listCartVer2 = listCart && listCart.map(p => ({
            product: p._id,
            quantity: p.quantity,
        }));

        const products = await productService.checkProductQuantity(listCartVer2);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    checkProductQuantity
}
