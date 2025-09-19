"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination , Autoplay } from 'swiper/modules';

import slide1 from '@/assets/images/slider-image-1.jpeg'
import slide2 from '@/assets/images/slider-image-2.jpeg'
import slide3 from '@/assets/images/slider-image-3.jpeg'

const images =[
  {path: slide1.src , label: 'Slide 1'},
  {path: slide2.src , label: 'Slide 2'},
  {path: slide3.src , label: 'Slide 3'},
]

const swiperOptions = {
  pagination: {
    clickable: true ,
    bulletClass: "swiper-pagination-bullet !border-2 !size-3" , // !size-4
    bulletActiveClass: "swiper-pagination-bullet-active !bg-red-800/70 !border-white" ,
  } ,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false ,
  },

   modules: [Pagination , Autoplay]
}
export default function MainSlider() {
 
return (
  <section className='w-full'>
    <Swiper {...swiperOptions}
      className='w-full  h-[35rem] mySwiper'>
      {images.map((image , idx) => (
        <SwiperSlide key={idx} className='w-full'>
          <Image
          src={image.path}
          alt={image.label}
          width={720}
          height={344}
          loading='lazy'
          className='w-full h-[32.5rem] object-contain'
          />
        </SwiperSlide>))}
    </Swiper>
  </section>

  )
}