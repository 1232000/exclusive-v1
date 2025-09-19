import MainSlider from "./components/home/MainSlider";
import CategoriesSection from "./components/home/CategoriesSection";
import ProductsSection from "./components/home/ProductsSection";
import { Suspense } from "react";
import { SkeletonCard } from "./shared/SkeletonCard";
import BrandsSection from "./components/home/BrandsSection";

export default function Home() {
  return (
    <>
    <MainSlider/>
    
    <Suspense fallback={<SkeletonCard/>}>
      <CategoriesSection/>
    </Suspense>

    <Suspense fallback={<SkeletonCard/>}>
      <ProductsSection/>
    </Suspense>
    
    <Suspense fallback={<SkeletonCard/>}>
      <BrandsSection/>
    </Suspense>
    </>
  );
}
