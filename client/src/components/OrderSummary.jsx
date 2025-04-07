import React, { useEffect } from 'react'
import { useCartStore } from '../store/CartStore'
import { loadStripe } from "@stripe/stripe-js"
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const stripePromise = loadStripe("pk_test_51R80KDR6STGHtwUjjE1Z4cvCj1y2yFPQiuLtiihJXV1VrUdMzNmnXuDaSn6LG6MGIGjMXjrlzTJUv3sEy8BfsYrr00OHYV0jbs")
export default function OrderSummary() {
  const { calculateTotalAmount ,totalAmount, subTotal, session, createSession, cartItems, coupon, isCouponApplied, getCoupon, applyCoupon, removeCoupon } = useCartStore();
  
  const handlePayment = async function(){
    const stripe = await stripePromise;

    await createSession(cartItems, coupon);
    const result = await stripe.redirectToCheckout({
        sessionId:session
    });
    if(result.error){
        toast.error(result.error)
    }
  }
    useEffect(()=>{
    calculateTotalAmount()
    }, [ calculateTotalAmount ])

    useEffect(()=>(
        getCoupon()
    ), [ getCoupon ])
  return (
    <div className='flex flex-col items-center gap-5 w-full'>
        <div className='bg-slate-900 border border-accent rounded-lg shadow-slate-900 shadow-md w-[320px] p-2 space-y-8' >
            <h1 className='text-start'>Order summary</h1>
            <div className='flex justify-between items-center'>
                <h2>Original price total:</h2>
                <h2>{subTotal.toFixed(2)}DH</h2>
            </div>
            <hr />
            <div className='flex justify-between items-center'>
                <h2>Total:</h2>
                <h2>{totalAmount.toFixed(2)}DH</h2>
            </div>
            {
                coupon && isCouponApplied &&
                (
                    <div className='flex justify-between items-center'>
                        <h2>Discount</h2>
                        <h2>{coupon.code} (-10%)</h2>
                    </div>
                )
            }
            <button 
            onClick={handlePayment}
            className='btn btn-square w-full btn-accent'>Proceed to checkout</button>
            <span></span>
        </div>
        <div className='bg-slate-900 border border-accent rounded-lg shadow-slate-900 shadow-md w-[320px] p-2 space-y-8' >
            <h1 className='text-start'>Do you have a coupon or a voucher card</h1>
            <input
            type='text'
            className='w-full input input-bordered input-md'
            placeholder='Coupon code'
            />
            <button 
            onClick={()=>applyCoupon(coupon.code)}
            className='btn btn-square w-full btn-accent'>Apply Coupon</button>
            {
                coupon && isCouponApplied &&
                (
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2>Discount</h2>
                            <h2>{coupon.code} (-10%)</h2>
                        </div>
                        <button 
                        onClick={()=>removeCoupon()}
                        className='btn btn-square'>
                            <X />
                        </button>
                    </div>
                )
            }
        </div>
    </div>
  )
}
