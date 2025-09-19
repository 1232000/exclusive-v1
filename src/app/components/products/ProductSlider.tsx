"use client"
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ProductSlider({images}:{images:string[]}) {

    // const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass |null>(null);

  return (
    <div className='flex justify-around'>  
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={4}
        direction="vertical"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[150px] h-[32rem] mt-3"       >
        {images.map((image , idx) => (
        <SwiperSlide key={idx} className=' g-red-900'>
            <Image
            src={image}
            alt={`${image}-${idx}`}
            width={350}
            height={350}
            loading='lazy'
            className='w-full h-[7rem] rounded-md cursor-pointer object-cover mt-5 g-green-400'
            />
            </SwiperSlide>))}
        </Swiper>


        <Swiper
        style={{
            '--swiper-navigation-color': 'black',
            '--swiper-pagination-color': 'black',
        }as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-[500px] h-[29rem] mt-10 g-gray-300"
    >
        {images.map((image , idx) => (
        <SwiperSlide key={idx} className='g-red-900'>
            <Image
            src={image}
            alt={`${image}-${idx}`}
            width={600}
            height={600}
            loading='lazy'
            className='w-full h-full mx-auto object-contain g-green-400'
            />
        </SwiperSlide>))}
    </Swiper>
    </div>
);
}