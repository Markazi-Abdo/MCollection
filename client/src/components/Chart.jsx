import React from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend } from "recharts"

export default function Chart({ data }) {
  return (
    <ResponsiveContainer height={"400"} width="100%">
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={"name"} stroke='#D1D5DB'/>
            <YAxis yAxisId="left" stroke='#D3D5DB'/>
            <YAxis yAxisId={"right"} stroke='#D3D5DB'/>
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
  )
}
