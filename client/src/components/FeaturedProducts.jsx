import React from 'react'
import { useState, useEffect } from 'react';
import { useAdminStore } from '../store/AdminStore';
import FeaturedProduct from './FeaturedProduct';
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react';

export default function FeaturedProducts() {
    const { getFeaturedProducts, featuredProducts  } = useAdminStore();
    const [ itemsPerPage, setItemsPerPage ] = useState(3);
    const [ currentIndex, setCurrentIndex ] = useState(0);
  
    useEffect(()=>{
      getFeaturedProducts();
    }, [ getFeaturedProducts ])
  
    useEffect(()=>{
      const handleResize = function(){
          if(window.innerWidth < 640) setItemsPerPage(1);
          else if(window.innerWidth < 1024) setItemsPerPage(2);
          else if(window.innerWidth < 1280) setItemsPerPage(3);
          else setItemsPerPage(3)
      };
      
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    })
  
    const nextButton = ()=>{
      setCurrentIndex((prevIndex)=> prevIndex +  itemsPerPage);
    }
    const prevButton = () => {
      setCurrentIndex((prevIndex)=> prevIndex - itemsPerPage);
    }
  
    const isStartOfSlider = currentIndex === 0;
    const isEndOfSlider = currentIndex >= featuredProducts.length - itemsPerPage;
    const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className='container py-2'>
        <div>
            <h2 className='text-cyan-600 text-center'>Feautured Products</h2>
            <div className='relative'>
                <div className='overflow-hidden container'>
                    <button
                    className='absolute left-0 top-[30%] z-50 btn btn-circle btn-accent'
                    onClick={prevButton}
                    disabled={isStartOfSlider}
                    ><MoveLeftIcon /></button>
                    <div className='flex gap-5 items-center transition-none'>
                        {
                            visibleProducts.map(product => {
                                return <FeaturedProduct product={product}/>
                            })
                        }
                    </div>
                    <button
                    onClick={nextButton}
                    disabled={isEndOfSlider}
                    className='absolute right-0 top-[30%] z-50 btn btn-circle btn-accent'
                    ><MoveRightIcon /></button>
                </div>
            </div>
        </div>
    </div>
  )
}
