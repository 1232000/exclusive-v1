import React from 'react'
import { IBrand } from './../../../interface/brand.interface';
import { getBrands } from '@/services/brands.servises';
import BrandItem from '@/app/components/brands/BrandItem';

export default async function BrandsPage() {
  const {data : brands}:{data: IBrand[]} = await getBrands();

return (
<section>
    <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
        {brands && brands.map((brand) => (
          <BrandItem key={brand._id} brand={brand} />
))}
        </div>
    </div>
</section>
    )
}
