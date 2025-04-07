import { motion } from "framer-motion"
import { useAnalyticsStore } from "../store/AnalyticsStore"
import { useEffect } from "react";
import AnalyticsTab from "./AnalyticsTab";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend } from "recharts"

export default function AnalyticsView() {
  const { data, getAnalytics } = useAnalyticsStore();

  useEffect(()=>{
    getAnalytics();
  }, [ getAnalytics ])

  console.log(data.dailySales);
  return (
    <motion.div
    initial={{ opacity:0.5, x:10 }}
    animate={{ opacity:1, x:0 }}
    transition={{ duration:0.7, ease:"linear" }}
    >
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-between items-center gap-4">
                <AnalyticsTab value={data?.analytics?.totalUsers} title={"Total Users"}/>
                <AnalyticsTab value={data?.analytics?.totalProducts} title={"Total Products"}/>
                <AnalyticsTab value={data?.analytics?.totalSales} title={"Total sales"}/>
                <AnalyticsTab value={data?.analytics?.totalRevenue} title={"Total revenue"}/>
            </div>
            <div className="w-full h-full bg-slate-900 rounded-xl p-2">
              <ResponsiveContainer height={400} width={"100%"}>
                <LineChart data={data?.dailySales || []}>
                    <CartesianGrid strokeDasharray="5 5"/>
                    <XAxis dataKey={"date"} stroke='#D1D5DB'/>
                    <YAxis yAxisId={"left"} stroke='#D3D5DB' orientation="left"/>
                    <YAxis yAxisId={"right"} stroke='#D3D5DB' orientation="right"/>
                    <Tooltip />
                    <Legend />
                    <Line 
                    yAxisId={"left"}
                    type={"monotone"}
                    dataKey={"sales"}
                    stroke='green'
                    activeDot={{ r:8 }}
                    name='Sales'
                    />
                    <Line 
                    yAxisId={"right"}
                    type={"monotone"}
                    dataKey={"revenue"}
                    stroke='blue'
                    activeDot={{ r:8 }}
                    name='Revenue'
                    />
                </LineChart>
              </ResponsiveContainer>
            </div>
        </div>
    </motion.div>
  )
}
