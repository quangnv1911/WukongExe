import { orderService, orderDetailService } from "../services/index.js";


const getRevenueAndProfitByYear = async (req, res) => {
    try {
        const { year } = req.params;

        if (!year || year === '') {
            return res.status(200).json({
                messages: 'Error'
            })
        }

        const dashboardStatic = await orderService.getRevenueProfitByYear(year);
        return res.status(200).json(dashboardStatic);

    } catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}
const createOrder = async (req, res) => {
    try {
        const { listCart, ...aOrder } = req.body;
        console.log(aOrder);
        const order = await orderService.createOrder(aOrder);
        const listCartVer2 = listCart.map(p => ({
            product: p._id,
            order: order._id,
            quantity: p.quantity,
            importPrice: p.importPrice,
            sellPrice: (p.sellPrice - (p.sellPrice*(p.discount/100)))
        }));

        console.log(listCartVer2);

        const lsOrderDetail = await Promise.all(
            listCartVer2.map(async (p) => {
                const orderDetail = await orderDetailService.createOrderDetail(p);
                console.log(orderDetail);
                return orderDetail;
            })
        );
        return res.status(201).json(order);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
}
//getAllOrder
const getAllOrder = async (req, res) => {
    try {
      const orders = await orderService.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
//getOrderById
const getOrderById = async (req, res) => {
    try {
      const order = await orderService.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export default {
    getRevenueAndProfitByYear,
    createOrder,
    getAllOrder,
    getOrderById
}