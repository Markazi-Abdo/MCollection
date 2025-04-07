import React, { useEffect, useState } from 'react'
import { useAdminStore } from '../store/AdminStore'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { category } = useParams();
  const { isLoading, getProductsByCategory, products } = useAdminStore();

  useEffect(()=>{
    getProductsByCategory(category);
  }, [ getProductsByCategory, category])

  console.log(products);

  if(isLoading){
    return <LoadingSpinner />
  }

  return (
    <div className=''>
      <motion.h1
      initial={{ opacity:0, y:10}}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:1 }}
      >
        <h1 className='text-4xl font-bold text-primary text-center'>{category}</h1>
      </motion.h1>
      <motion.div
      initial={{ opacity:0, y:10}}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:1 }}
      >
        <div>
          {
            products?.length === 0 && <h1>No items in this category</h1>
          }
          {
            products?.map(product => (
              <ProductCard key={product._id} product={product}/>
            ))
          }
        </div>
      </motion.div>
    </div>
  )
}
