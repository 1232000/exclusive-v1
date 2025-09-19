import ProductItem from '@/app/components/products/ProductItem';
import SectionTitle from '@/app/shared/SectionTitle';
import { IBrand } from '@/interface/brand.interface';
import { IProduct } from '@/interface/product.interface';
import { getBrandDetails } from '@/services/brands.servises';
import { getProducts } from '@/services/products.servises';
import React from 'react'

export default async function BrandDetails({params:{brandId}} : {params:{brandId:string}}) { 

  const res = await getBrandDetails(brandId);
  const brand: IBrand = res.data;

  const {data : products}:{data:IProduct[]} = await getProducts(40 ,undefined, brandId)
  console.log(products);

  return (<>
  <section>
    <div className="container">
      <SectionTitle title="Browse By Brands" subtitle={brand.name}/>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
      {products && products.length > 0 ? products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))
      :
      ( 
        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold w-full mx-auto">No products in this brand yet !</h2>
        </div>
      )
      }
    </div>
    </div>
  </section>
  </>
  )
}
