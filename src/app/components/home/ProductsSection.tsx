import SectionTitle from '@/app/shared/SectionTitle'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { getProducts } from '@/services/products.servises';
import { IProduct } from '@/interface/product.interface';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductItem from '../products/ProductItem';

export default async function ProductsSection() {
  
  const {data : products}:{data: IProduct[]} = await getProducts(8);  

return (
<section>
  <div className="container mx-auto mt-10">
    <SectionTitle title={"Products"} subtitle={"Browse By Product"}/>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
      {products && products.map((product) => (
        <ProductItem key={product._id} product={product} />
))}
    </div>

    <div className="flex justify-center pb-10">
      <Button className='mx-auto bg-rose-500' asChild>
        <Link href={'/products'}>View All Products</Link>
      </Button>
    </div>
    <Separator />
	</div>
</section>
    )
}
