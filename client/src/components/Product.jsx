import { CheckIcon, StarIcon } from 'lucide-react'
import React from 'react'
import UpdateProductModal from './UpdateProductModal';

export default function Product({ product, deleteFunc, featureFunc  }) {
  const featProd = product.isFeatured;
  console.log(featProd);
  return (
    <div className='flex justify-between items-center gap-2 border border-primary p-2 rounded-md bg-slate-950 my-2 w-[1200px]'>
        <figure>
            <img 
            src={product?.image || "/vite.svg"}
            className='size-20 rounded-3xl object-cover bg-center'
            />
        </figure>
        <div className='flex flex-col justify-between items-start gap-5'>
            <h4>{product?.title}</h4>
            <p>{product?.description}</p>
        </div>
        <div className='flex flex-col justify-between items-start gap-5'>
            <h4>{product?.price}DH</h4>
            <p>{product?.category}</p>
        </div>
        <div className='flex justify-between items-start gap-5'>
            <button 
            className='btn btn-square btn-primary w-32 h-8'
            onClick={()=>document.getElementById("modal").showModal()}
            >Update</button>
            <button 
            onClick={()=>deleteFunc(product?._id)}
            className='btn btn-square btn-error  w-32 h-8'>DELETE</button>
        </div>
        <div >
            <button type="button"
            onClick={()=>featureFunc(product?._id)}
            >
                {
                    featProd ? (
                        <i className='text-yellow-600'><CheckIcon /></i>
                    ) : (
                        <i><StarIcon  className='text-yellow-400 size-8'/></i>
                    )
                }
            </button>
        </div>
        <UpdateProductModal product={product} />
    </div>
  )
}
