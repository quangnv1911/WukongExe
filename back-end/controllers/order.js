import { orderService } from "../services/index.js";

const getRevenueAndProfitByYear = async (req, res) => {
    try {
        const {year} =  req.params;

        if(!year || year === '') {
            return res.status(200).json({
                messages: 'Error'
            })
        }
           
        const dashboardStatic = await orderService.getRevenueProfitByYear(year);
        return res.status(200).json(dashboardStatic);
        
    } catch (error){
        res.status(500).json({
            messages: error.toString()
        })
    }
}

export default {
    getRevenueAndProfitByYear
}