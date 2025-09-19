"use client"
import React from 'react'

export default function error({error}:{error:Error}) {
  return (
  <div className='flex flex-col justify-center items-center fixed top-0 bottom-0 start-0 end-0 bg-red-700 text-white'>
    <h1 className='text-4xl pb-5'>Somthing Went Wrong</h1>
    <p className='text-2xl'>{error.message}</p>
  </div>

  )
}
