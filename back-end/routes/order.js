import express from 'express';
import { orderController } from '../controllers/index.js'

const router = express.Router();

router.get('/static/:year', orderController.getRevenueAndProfitByYear);

export default router;