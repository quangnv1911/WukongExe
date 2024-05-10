import express from 'express';
import productController from "../controllers/product.js";
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/products")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage });

const router = express.Router();
router.get("/", productController.getAllProduct)
router.post("/", upload.single('image'), productController.createProduct);
router.put("/:productId", upload.single('image'), productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

export default router;
