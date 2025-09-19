import Image from 'next/image';
import React from 'react'
import { ICategory } from '@/interface/category.interface';
import { getCategories } from '@/services/categories.servises';
import Link from 'next/link';

// export default async function CategoriesPage({categoryId} :{categoryId:string}) {
export default async function CategoriesPage() {

  const {data : categories}:{data: ICategory[]} = await getCategories();  

return (
    <div className="relative rounded-sm bg-stone-50 text-black dark:bg-stone-700 dark:text-stone-300 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-15">
        {categories && categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="flex flex-col items-center justify-center rounded-lg bg-white dark:bg-stone-800 shadow p-4 hover:shadow-lg transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={120}
              height={120}
              className="rounded-md object-contain mb-3"
            />
            <h2 className="text-lg font-semibold">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>

    )
}
