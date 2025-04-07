import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { useCartStore } from '../store/CartStore'

export default function CartProduct({ item }) {
  const { updateQuantity, removeFromCart  } = useCartStore();
 
  return (
    <div className='border border-accent shadow-md rounded-lg p-2 flex items-center justify-between gap-5 w-[750px] bg-slate-900 my-2'>
        <figure>
            <img 
            src={item.image}
            className='size-24'
            />
        </figure>
        <div className='flex flex-col justify-between items-center'>
            <div>
                <h1>{item.title}</h1>
                <h4>{item.category}</h4>
            </div>
            <button 
            onClick={()=>removeFromCart(item._id.toString())}
            className='btn btn-error btn-square size-10'>
                <TrashIcon />
            </button>
        </div>
        <div className='flex items-center'>
            <button
            onClick={()=>updateQuantity(item._id, item.quantity + 1)}
            ><PlusIcon/></button>
            <span>{item.quantity}</span>
            <button
             onClick={()=>updateQuantity(item._id, item.quantity - 1)}
            ><MinusIcon /></button>
        </div>
        <div>
            <h2 className='text-accent'>{item.price}DH</h2>
        </div>
    </div>
  )
}
