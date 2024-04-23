import express from 'express';
import productController from "../controllers/product.js";

const router = express.Router();
router.get("/", productController.getAllProduct)
router.post("/", productController.createProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

export default router;
