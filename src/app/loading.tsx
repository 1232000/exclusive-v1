import React from 'react'
import style from './loading.module.css'
export default function Loading() {
  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 start-0 end-0 bg-stone-300/30  ">
      <div className={style.loader}></div>
    </div>
  )
}

