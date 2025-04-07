import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className='bg-slate-900'>
        <div className='flex justify-center items-center w-full h-screen'>
            <div>
                <i className='text-blue-500'>
                    <LoaderCircleIcon className='animate-spin size-9' />
                </i>
            </div>
           <p>Loading....</p>
        </div>
    </div>
  )
}
