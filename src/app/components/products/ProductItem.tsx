import { IProduct } from '@/interface/product.interface'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCartBtn from './AddToCartBtn'
import AddToWishlistBtn from './AddToWishlistBtn'

export default function ProductItem({product} : {product: IProduct}) {

return (
  <div className="relative rounded-sm bg-stone-200 text-black dark:bg-stone-700 dark:text-stone-300 p-2">
    <picture className='relative group overflow-hidden'>
        <Link href={`/products/${product._id}`}>
            <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={260}
            loading='lazy'
            className='w-full h-[20rem] object-contain'
            />
        </Link>
        <AddToCartBtn productId={product._id}
          className='bg-black text-stone-200 hover:bg-black cursor-pointer rounded-none w-full absolute bottom-0 translate-y-full group-hover:translate-0 invisible group-hover:visible'
        />
      </picture>

    <div className="px-4">
        <div className="flex justify-between cursor-pointer">
          <div className='text-xs bg-red-400 text-white rounded-lg px-2 size-fit mt-3'>{product?.category?.name}</div>
          <AddToWishlistBtn productId={product._id}
          className=
          "text-red-600 cursor-pointer mt-3 bg-transparent hover:bg-transparent"
          />
        </div>
        <h3 className='font-medium mb-2 pt-2 line-clamp-1 text-black dark:text-stone-300'>
            <Link href={`/products/${product._id}`}>{product.title}</Link></h3>

        <div className="flex ps-2 mb-2 justify-between items-center">
            <span className='font-medium text-red-600 dark:bg-stone-300 w-fit p-1 rounded-sm'>{product.price}$</span>
            <div className="flex items-center space-x-1">
                <Star className='text-amber-400 fill-amber-400' />
                <span className=' font-semibold'>{product.ratingsAverage}</span>
            </div>
        </div>
    </div>
</div>  )
}
