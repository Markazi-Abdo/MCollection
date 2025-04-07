import { ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../store/AuthStore'
import toast from 'react-hot-toast';
import { useCartStore } from '../store/CartStore';

export default function ProductCard({ product }) {
  const { user } = useAuthStore();
  const { isLoading, addToCart } = useCartStore()

  const handleAddCart = function(){
    if (user) { 
        addToCart(product);
    } else {
        toast.error("Login or create an account first", { id:"login" });
        return
    }
  }
  return (
    <div className='card card-bordered w-[300px] h-[360px] bg-slate-900 rounded-lg mx-10'>
        <figure>
            <img 
            src={product?.image} 
            className='object-cover '
            />
        </figure>
        <div className='card-body'>
            <h1 className='text-xl font-bold'>{product?.title}</h1>
            <p className='text-md font-bold'>{product?.description}</p>
            <h1 className='text-xl font-bold'>{product?.price} DH</h1>
        </div>
        <div className='card-actions'>
            <button
            onClick={handleAddCart}
            className='btn btn-square btn-primary w-full'>Add to cart <ShoppingCartIcon /></button>
        </div>
    </div>
  )
}
