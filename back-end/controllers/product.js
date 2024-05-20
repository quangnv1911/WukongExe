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
        const { 
            name,
            importPrice,
            sellPrice,
            discount,
            discountTime,
            isCombo,
            subdescription,
            category
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
            image: image
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
            category
        } =  req.body;
        var updateProduct2 = {
            name,
            importPrice,
            sellPrice,
            discount,
            discountTime,
            isCombo:  isCombo === 'true' ? true : false,
            subdescription,
            category
        }
        if(updateProduct2.discountTime === 'null') {
            updateProduct2.discountTime = null;
        }

        if(updateProduct2.subdescription === 'undefined') {
            updateProduct2.subdescription = null;
        }
        console.log('req.file', req.file);
        if(req.file) {
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
export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct
}
