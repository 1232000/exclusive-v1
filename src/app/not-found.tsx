import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
  <>
    <div className='flex flex-col justify-center items-center gap-4 fixed top-0 bottom-0 start-0 end-0'>
        <h1 className='text-5xl pb-8 text-black font-bold'>404 Not Found</h1>
        <h5 className='text-lg pb-8 text-black'>Your visited page not found. You may go home page.</h5>
        <Button className='bg-rose-600 rounded-none' asChild>
          <Link href="/">Back to home page</Link>
        </Button>
    </div>
  </>
  )
}
