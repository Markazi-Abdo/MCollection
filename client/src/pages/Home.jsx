import { Link } from 'react-router-dom';
import categories from '../constants/categories';
import { motion } from 'framer-motion';
import { useAdminStore } from '../store/AdminStore';
import { useEffect, useState } from 'react';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <motion.div
    initial={{ opacity:0, y:20 }}
    animate={{ opacity:1, y:0 }}
    transition={{ duration:1, ease:"easeInOut" }}
    >
        <div className='flex flex-col items-center justify-center container overflow-x-hidden'>
            <div className='mt-10'>
                <h1 className='text-primary font-bold text-5xl text-center'>EXPLORE OUR CATEGORIES</h1>
            </div>
            <div className='mt-10 grid grid-cols-3 max-lg:grid-cols-1 gap-5'>
                {
                    categories.map(ct => (
                        <div 
                        key={ct.title}
                        className='card card-bordered w-[420px] h-[420px] bg-slate-900 shadow-slate-950 shadow-lg'
                        >
                            <figure>
                                <img 
                                src={ct.image}
                                className='object-cover bg-center w-full h-full duration-200 transition-all hover:scale-110'
                                />
                            </figure>
                            <div className='card-body'>
                                <h1 className='card-title text-start'>Look for {ct.title}</h1>
                                <Link to={`/category/${ct.title}`}>
                                    <div className='card-actions justify-end'>
                                            <button className='btn btn-square btn-primary rounded-xl w-full h-fit'>{ct.title}</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='m-5'>
                <FeaturedProducts />
            </div>
        </div>
    </motion.div>
  )
}
