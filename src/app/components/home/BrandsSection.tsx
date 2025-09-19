import SectionTitle from '@/app/shared/SectionTitle'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IBrand } from '@/interface/brand.interface';
import { getBrands } from '@/services/brands.servises';
import BrandItem from '../brands/BrandItem';

export default async function BrandsSection() {

    const {data : brands}:{data: IBrand[]} = await getBrands(4);

return (
<section>
    <div className="container mx-auto mt-10">
        <SectionTitle title={"Brands"} subtitle={"Browse By Brand"}/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
        {brands && brands.map((brand) => (
            <BrandItem key={brand._id} brand={brand} />
))}
        </div>

        <div className="flex justify-center pb-10">
            <Button className='mx-auto bg-rose-600' asChild>
                <Link href={'/brands'}>View All Brands</Link>
            </Button>
        </div>
        <Separator />
    </div>
</section>
    )
}
