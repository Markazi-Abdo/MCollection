import React, { useEffect } from 'react'
import { useCartStore } from '../store/CartStore'
import { PlusIcon } from 'lucide-react';

export default function SuugestedProduct() {
  const { suggestions, getSuggestion, addToCart } = useCartStore();
  
  useEffect(()=>{
    getSuggestion();
  }, [ getSuggestion ])


  return (
    <div className='mt-10'>
        <h3>People Also bought</h3>
        <div className='flex items-center gap-2'>
            {
                suggestions.map(pr=>(
                    <div className='card w-80 card-bordered rounded-xl bg-slate-900'>
                        <figure className='w-full'>
                            <img 
                            src={pr.image}
                            className='size-40 object-cover'
                            />
                        </figure>
                        <div className="card-body">
                            <h3>{pr.title}</h3>
                            <h3>{pr.price.toFixed(2)}DH</h3>
                            <button 
                            onClick={()=>addToCart(pr)}
                            className='flex items-center w-full btn btn-square btn-accent'>
                                <i><PlusIcon /></i>Add To Cart
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
