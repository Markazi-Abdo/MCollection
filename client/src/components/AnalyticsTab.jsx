import React from 'react'

export default function AnalyticsTab({ title, value }) {
  return (
    <div className='flex justify-between items-center bg-slate-900 p-8 w-80 rounded-xl shadow-slate-900 shadow-lg'>
        <div className='flex flex-col items-center justify-start gap-2'>
            <h1>{title}</h1>
            <h2>{value}</h2>
        </div>
    </div>
  )
}
