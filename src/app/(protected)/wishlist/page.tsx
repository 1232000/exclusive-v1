"use client"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import React from 'react'
// import { useState } from 'react'
import Link from 'next/link';
import { useWishlistContext } from "@/context/WishlistContext"
import { CircleX, Shirt, Star, User } from "lucide-react"
import { removeWishlistItem } from "@/services/wishlist.services"
import { toast } from "sonner"

export default function WishlistPage() {

  const {wishlistDetails , setWishlistDetails } = useWishlistContext();
  // const [isloading, setIsLoading] = useState(false)


  async function removeProductFromWishlist(productId:string) {
    // setIsLoading(true);
    const res = await removeWishlistItem(productId);
    console.log('res wishlist = ' , res);
    if (res?.success) {      
    toast.success(res?.message ,{position: "top-center" })
    setWishlistDetails((currentData) => {
      if (!currentData) return currentData;
      return {
        ...currentData,
        count: currentData.count - 1,
        data: currentData.data.filter((product) => product._id !== productId),
      };
    });
    // setIsLoading(false);
    } else {
      // setIsLoading(false);
      toast.error(res?.message || "Somthing went wrong" , {position: "top-center" })
    }
  }
  return (
  <section>
    <div className="container mx-auto lg:px-20">
      {wishlistDetails ?  <>
      <section className="mb-20">
        <Table className="mb-6">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {wishlistDetails?.data?.map((product)=>(
            <TableRow key={product._id}>
              <TableCell className="font-medium">
                <p className="text-xs bg-red-200 px-1 rounded-lg mb-1 w-fit">
                  {product?.category?.name || "No Category"}
                </p>
                <div className="flex items-center gap-5 relative">
                  <CircleX 
                  onClick={()=> removeProductFromWishlist(product._id)}
                  className="absolute top-0 -start-2 cursor-pointer text-white fill-red-600"/>
                  <Image 
                  src={product.imageCover}
                  alt={product.title}
                  width={54}
                  height={54}
                  />
                  <h2 className="whitespace-normal break-words w-[150px] lg:whitespace-nowrap md:w-auto">{product.title}</h2>
                </div>
              </TableCell>

              <TableCell>
                {product?.brand?.name || "No Brand"}
              </TableCell>

              <TableCell className="text-start">
                <div className="text-red-500 text-lg">
                  {product.price} $
                </div>
              </TableCell>
            
              <TableCell>
                <div className="flex items-center gap-1">
                  {product.sold >9000000? '9000000+' : product.sold} 
                  <User className="size-5" />
                </div>
              </TableCell>
                            
              <TableCell>
                <div className="flex items-center gap-1">
                  {product.quantity}
                  <Shirt className="size-5"/>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex justify-center items-center">
                  {product.ratingsAverage}
                  <Star className="fill-amber-400 text-amber-400 mb-1 px-1"/>
                  ({product.ratingsQuantity})
                </div>
              </TableCell>

            </TableRow>
            ))}

          </TableBody>
        </Table>

        <div className="flex justify-between ">
          <Button variant={"outline"}>
            <Link href={'/products'}>Return To Shop</Link>
          </Button>
        </div>
      </section>
      </>
      :
      (<Button asChild>
        <Link href="/">Go to Shopping</Link>
      </Button>)
      }
    </div>
</section>
    
  )
}