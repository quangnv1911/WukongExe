import OrderDetail from '../models/OrderDetail.js';

const ratioRevenueAndProfit = async (fromDate, toDate) => {
    try {
        var condition;
        if (fromDate === '' && toDate === '') { //Case: getAll
            condition = {}
        } else {
            //Case: get by date
            condition = {
                createdAt: {
                    $gte: fromDate,
                    $lte: toDate
                }
            }
        }

        const dashboardStatic = await OrderDetail.find(condition).populate('product', 'name');
        return groupProduct(dashboardStatic);

    } catch (error) {
        console.log('Service: dashboardStatic', error);
    }
}
const groupProduct = (products) => {
    const staticMap = new Map();

    // Duyệt qua mỗi sản phẩm trong mảng
    products.forEach(element => {
        // Lấy id, tên và doanh thu của sản phẩm
        const { product, sellPrice, quantity, importPrice } = element;
        const { _id, name } = product;

        // Tính tổng doanh thu cho mỗi sản phẩm
        const revenue = sellPrice * quantity;
        // Tính tổng lợi nhuận cho mỗi sản phẩm
        const profit = (sellPrice - importPrice) * quantity;

        // Kiểm tra xem sản phẩm đã được tính tổng doanh thu chưa
        if (staticMap.has(_id)) {
            // Nếu đã tồn tại, thì cập nhật tổng doanh thu
            staticMap.set(_id, {
                id: _id,
                name: name,
                revenue: staticMap.get(_id).revenue + revenue,
                profit: staticMap.get(_id).profit + profit
            });
        } else {
            // Nếu chưa tồn tại, thêm vào map với tổng doanh thu là doanh thu của sản phẩm
            staticMap.set(_id, {
                id: _id,
                name: name,
                revenue: revenue,
                profit: profit
            });
        }
    });

    // Chuyển Map thành mảng và trả về
    return Array.from(staticMap.values());
}

export default {
    ratioRevenueAndProfit
}