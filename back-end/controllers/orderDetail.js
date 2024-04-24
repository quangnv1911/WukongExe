import { orderDetailService, orderService } from "../services/index.js";
const dashboardStatic = async (req, res) => {
    try {
        const { fromDate, toDate } = req.params;

        if (!fromDate || !toDate || (fromDate !== '' && toDate === '') || (fromDate === '' && toDate !== '') || fromDate > toDate) {
            return res.status(200).json({
                messages: 'Error'
            })
        }

        const dashboardStatic = await orderService.dashboardStatic(fromDate, toDate);
        const ratioRevenueAndProfit = await orderDetailService.ratioRevenueAndProfit(fromDate, toDate);
        return res.status(200).json({
            revenue: dashboardStatic.total,
            profit: dashboardStatic.totalProfit,
            numberOrder: dashboardStatic.numberOrder,
            staticOfProduct: ratioRevenueAndProfit
        });
    } catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}
// const creatOrderDetail = async () => {
//     try {
//         const { listCart, ...aOrder } = req.body;
//         console.log(aOrder);
//         const order = await orderService.createOrder(aOrder);
//         return res.status(201).json({});
//     } catch (error) {
//         res.status(500).json({
//             error: error.toString()
//         })
//     }
// }

export default {
    dashboardStatic
}