import express from 'express';
import { orderController } from '../controllers/index.js'

const router = express.Router();

router.get('/', orderController.getAllOrder);
router.get('/:id', orderController.getOrderById);
router.get('/static/:year', orderController.getRevenueAndProfitByYear);
router.post('/', orderController.createOrder);
export default router;