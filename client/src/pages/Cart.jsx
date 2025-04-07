import React, { useEffect } from 'react'
import { useCartStore } from '../store/CartStore'
import CartProduct from '../components/CartProduct';
import { useAuthStore } from '../store/AuthStore';
import OrderSummary from '../components/OrderSummary';
import SuugestedProduct from '../components/SuugestedProduct';

export default function Cart() {
  const { cartItems, totalAmount, subTotal, suggestions, getSuggestion } = useCartStore();
  
  useEffect(()=>{
    getSuggestion();
  }, [ getSuggestion ])

  return (
    <div className=''>
      <div className='flex justify-center  w-full max-h-full'>
        <div className='flex flex-col items-center gap-5 w-2/3'>
            <div>
              {
                cartItems.length === 0 && <p>No items in cart</p> 
              }
              {
                cartItems.map(item => (
                  <CartProduct item={item} key={item._id}/>
                ))
              }
            </div>
            <div>
              <SuugestedProduct />
            </div>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
