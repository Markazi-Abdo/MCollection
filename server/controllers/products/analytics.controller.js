import Order from "../../model/order.model.js";
import Product from "../../model/product.model.js";
import User from "../../model/user.model.js"
import { dbLogger } from "../../logs/database/database.js";

const getAnalytics = async function(){
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        const salesData = await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalSales:{ $sum:1 },
                    totalRevenue: { $sum:"$totalamount" }
                }
            }
        ]);

        console.log(salesData);
        const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue:0 };
        return { totalUsers, totalProducts, totalSales, totalRevenue };

    } catch (error) {
        throw error;
    }
    
}

const getDaysInRange = function(startDate, endDate){
    let dates = [];
    let currentDate = new Date(startDate);

    while (endDate >= currentDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

const getDailySalesData = async function(startDate, endDate){
    try {
        const salesData = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte: startDate,
                        $lte: endDate
                    }
                },
            },
            {
                $group:{
                    _id:{ $dateToString: { format:"%Y-%m-%d", date:"$createdAt" }},
                    sales:{ $sum:1 },
                    revenue: { $sum:{ $toDouble:"$totalamount" } }
                },
            },
            {
                $sort:{
                    _id:1
                }
            }
        ]);
        
        console.log("SalesData", salesData);
        const datesArray = getDaysInRange(startDate, endDate);
        return datesArray.map(date => {
            const foundData = salesData.find(item => item._id === date);
    
            return{
                date,
                sales: foundData?.sales || 0,
                revenue: foundData?.revenue || 0
            }
        }) 
    } catch (error) {
        throw error;
    }
    
}

export const getData = async function(req, res){
    try {
        const analytics = await getAnalytics();
        console.log("Analytics: ",analytics);

        const endDay = new Date();
        const startDay = new Date(endDay.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dailySales = await getDailySalesData(startDay, endDay);
        console.log("DailySales", dailySales);

        res.status(200).json({ success:true, message:"Got data for admin", data:{ analytics, dailySales }})
    } catch (error) {
        console.log("Error: " + error.message + " was found at " + error.stack);
        return res.status(500).json({ success:false, message:error.message });
    }
}