import React from 'react'
import { getProducts } from '@/services/products.servises';
import { IProduct } from '@/interface/product.interface'
import ProductItem from '@/app/components/products/ProductItem';

export default async function ProductsPage() {
  const {data : products}:{data: IProduct[]} = await getProducts();

return (
<section>
    <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
        {products && products.map((product) => (
          <ProductItem key={product._id} product={product} />
))}
        </div>
    </div>
</section>
    )
}
