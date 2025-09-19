import React from 'react'

export default function SectionTitle({title , subtitle}: {title:string , subtitle: string}) {
  return (<>
    <div className='flex mb-5'>
        <span className='bg-rose-500 dark:bg-orange-200 w-[15px] h-[30px] border-end rounded-e-sm me-2'></span>
        <h2 className='mt-1 font-semibold text-rose-500 dark:text-orange-200'>{title}</h2>
    </div>
    <div className="mb-16">
        <span className='text-4xl font-semibold block'>{subtitle}</span>
    </div>
  </>
  )
}
