"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { ICategory } from '@/interface/category.interface';
import Link from 'next/link';

const swiperOptions = {
  spaceBetween: 0 ,
  slidesPerView: 1 ,
  breakpoints:{
    640:{ spaceBetween: 20 , slidesPerView: 2 , },
    768:{ spaceBetween: 25 , slidesPerView: 3 , },
    900:{ spaceBetween: 30 , slidesPerView: 4 , },
    1200:{ spaceBetween: 30 , slidesPerView: 5 , },
    1400:{ spaceBetween: 30 , slidesPerView: 6 , },
  },
  pagination: {
    clickable: true ,
    bulletClass: "swiper-pagination-bullet !border-2 !size-3" ,
    bulletActiveClass: "swiper-pagination-bullet-active !bg-red-800/70 !border-white" ,
  } ,
  loop: true,

  modules: [Pagination],
}

export default function CategoriesSlider({categories} : {categories:ICategory[]}) {
  return (<>
    <div className='g-green-700 w-full pb-5'>
        <Swiper {...swiperOptions}
        className='g-red-400 w-full h-[22rem] mySwiper'>
        {categories?.map((category) => (

            <SwiperSlide key={category._id} className='g-red-900'>
              <Link href={`/categories/${category._id}`}>
                <Image
                src={category.image}
                alt={category.name}
                width={270}
                height={260}
                loading='lazy'
                className='w-full h-[15.625rem] object-cover'
                />
                <h3 className='text-center font-medium pt-4 text-black dark:text-white'>{category.name}</h3>
              </Link>
            </SwiperSlide>))}
        </Swiper>  
    </div>
  </>
    )
}

