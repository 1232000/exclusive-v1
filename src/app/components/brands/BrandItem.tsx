import { IBrand } from '@/interface/brand.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BrandItem({brand} : {brand: IBrand}) {
  return (
    <div className="rounded-sm bg-stone-200 text-black dark:bg-stone-700 dark:text-stone-300 p-2">
      <picture className='relative group overflow-hidden'>
        <Link href={`/brands/${brand._id}`}>
          <Image
          src={brand.image}
          alt={brand.name}
          width={270}
          height={260}
          loading='lazy'
          className='w-full h-[20rem]'
          />
        </Link>
      </picture>

        <h3 className='font-medium mb-2 pt-4 line-clamp-1 text-black dark:text-stone-300'>
          <Link href={`/brands/${brand._id}`}>{brand.name}</Link>
        </h3>

        </div>  )
}
