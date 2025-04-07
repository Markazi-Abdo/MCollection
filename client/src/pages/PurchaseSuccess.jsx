import React, { useEffect } from 'react'
import { useCartStore } from '../store/CartStore'
import { useParams } from 'react-router-dom';
import Confetti from "react-confetti"

export default function PurchaseSuccess() {
  const sessionId = new URLSearchParams(window.location.search).get("session_id");
  const { handleCheckoutSuccess } = useCartStore();
  
  useEffect(()=>{
    handleCheckoutSuccess(sessionId);
  }, [ handleCheckoutSuccess, sessionId ]);

  return (
    <div className='flex justify-center items-center h-screen'>
        <Confetti 
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.5}
        style={{zIndex:1000}}
        numberOfPieces={200}
        />
        <div className='border border-slate-950 shadow-slate-900 shadow-lg rounded-lg'>
            <div className='flex flex-col items-center gap-4 p-5'>
                <h1 className='text-4xl font-bold uppercase'>Thanks for purchasing from MCOLLECTIONS</h1>
            </div>
        </div>
    </div>
  )
}
