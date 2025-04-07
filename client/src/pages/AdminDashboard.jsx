import React, { useState } from 'react'
import { useAuthStore } from '../store/AuthStore'
import { ChartNoAxesColumn, PlusCircleIcon, ShoppingBasketIcon } from 'lucide-react';
import { motion } from "framer-motion"
import CreateProductView from '../components/CreateProductView';
import ProductsView from '../components/ProductsView';
import AnalyticsView from '../components/AnalyticsView';

export default function AdminDashboard() {
    const [ viewType, setViewType ] = useState("createproduct");
    const { user } = useAuthStore();

    return (
        <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1, ease:"easeInOut" }}
        >
            <div className='flex flex-col items-center justify-center mt-5 gap-2'>
                <div>
                    <h1 className='text-3xl font-bold text-primary uppercase'>{user?.username}'s Dashboard</h1>
                </div>
                <div className='flex justify-center items-center gap-10 mt-5'>
                    <button
                    className={`flex items-center btn btn-square btn-accent w-full ${viewType === "createproduct" && "bg-opacity-50"}`}
                    onClick={()=>setViewType("createproduct")}
                    >
                        <i><PlusCircleIcon /></i>
                        <span>Create new product</span>
                    </button>
                    <button 
                    className={`flex items-center btn btn-square btn-accent w-full ${viewType === "products" && "bg-opacity-50"}`}
                    onClick={()=>setViewType("products")}
                    >
                        <i><ShoppingBasketIcon /></i>
                        <span>Products</span>
                    </button>
                    <button 
                    className={`flex items-center btn btn-square btn-accent w-full ${viewType === "analytics" && "bg-opacity-50"}`}
                    onClick={()=>setViewType("analytics")}
                    >
                        <i><ChartNoAxesColumn /></i>
                        <span>Analytics</span>
                    </button>
                </div>
                    <div className='mt-5'>
                        {
                            viewType === "createproduct" && <CreateProductView />
                        }
                        {
                            viewType === "products" && <ProductsView />
                        }
                        {
                            viewType === "analytics" && <AnalyticsView />
                        }
                    </div>
            </div>
        </motion.div>
    )
}
