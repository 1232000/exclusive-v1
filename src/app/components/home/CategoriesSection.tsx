import React from 'react'
import { getCategories } from '@/services/categories.servises';
import { ICategory } from '@/interface/category.interface';
import CategoriesSlider from './CategoriesSlider';
import SectionTitle from '@/app/shared/SectionTitle';
import { Separator } from '@/components/ui/separator';

export default async function CategoriesSection() {

  const {data : categories}:{data:ICategory[]} = await getCategories();

return (<>
  <section className='px-10'>
    <Separator />
      <div className="container mx-auto mt-10">
        
        <SectionTitle title={"Categories"} subtitle={"Browse By Category"}/>
        <CategoriesSlider categories={categories}/>
        <Separator />
      </div>
  </section>
</>
  )
}
