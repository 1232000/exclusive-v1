import AddToWishlistBtn from '@/app/components/products/AddToWishlistBtn';
import ProductItem from '@/app/components/products/ProductItem';
import ProductSlider from '@/app/components/products/ProductSlider';
import SectionTitle from '@/app/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/interface/product.interface';
import { getProducts, getProductsDetails } from '@/services/products.servises';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function ProductDetails({params:{productId}} : {params:{productId:string}}) {

  const {data : product}:{data:IProduct} = await getProductsDetails(productId);

  const {data : products}:{data:IProduct[]} = await getProducts(8 , product.category._id)

return (<>
  <section className='py-10 g-green-800'>
    <div className="container mx-auto bg-gray-50 shadow-lg rounded-lg">
      <div className="g-blue-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-6">
        <div className="lg:col-span-2 g-amber-700 h-[550px]">
            
            <ProductSlider images={product.images} />
        </div>
        <div className="lg:col-span-1 g-teal-300 pt-10 pe-10">
          <h1 className='font-semibold text-2xl mb-4'>{product.title}</h1>
          <div className="flex justify-between">
              <div className="flex items-center gap-x-1 mb-4">
                  <Star className='text-amber-400 fill-amber-400' />
                  <span className=' font-semibold text-sm  text-gray-500'>{product.ratingsAverage}</span>
              </div>
              <AddToWishlistBtn productId={product._id}
              className="text-red-600 bg-transparent cursor-pointer mt-3"/>
          </div>
          <span className='font-medium text-2xl mb-6 block'>{product.price}$</span>
          <p className='text-sm border-b border-b-gray-400 pb-6 mb-6'>{product.description}</p>

          <Button className='w-full bg-rose-500' asChild>
              <Link href={'/products'}>Add To Cart</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div className="container">
      <SectionTitle title="Related Products" subtitle='Everything you want'/>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
      {products && products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
    </div>
  </section>
</>
)
}
