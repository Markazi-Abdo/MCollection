import React from 'react'

export default function PurchaseCancelled() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='border border-slate-950 shadow-slate-900 shadow-lg rounded-lg'>
            <div className='flex flex-col items-center gap-4 p-5'>
                <h1 className='text-4xl font-bold uppercase'>Soory but the purchase was cancelled</h1>
            </div>
        </div>
    </div>
  )
}
