import express from 'express';
import { orderDetailController } from '../controllers/index.js'

const router = express.Router();

router.get('/static/:fromDate/:toDate', orderDetailController.dashboardStatic);

export default router;