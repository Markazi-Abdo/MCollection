import React from 'react'
import { useCartStore } from '../store/CartStore'

export default function FeaturedProduct({ product }) {
  const { addToCart } = useCartStore()
  return (
    <div className='my-auto card w-[420px] card-bordered rounded-xl bg-slate-900'>
        <figure>
            <img src={product.image} 
            className='object-cover size-32'
            />
        </figure>
        <div className='card-body'>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className='card-actions'>
                <button 
                onClick={()=>addToCart(product)}
                className='btn btn-square btn-primary w-full'>
                    Add To Cart
                </button>
            </div>
        </div>
    </div>
  )
}
