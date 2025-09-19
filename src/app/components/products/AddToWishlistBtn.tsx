"use client"
import { useWishlistContext } from '@/context/WishlistContext';
import { addToWishlist } from '@/services/wishlist.services';
import { Heart } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

export default function AddToWishlistBtn(
  {productId, ...props} :
  {productId: string;
    [key: string]:string;
  } ) {
    
const { getWishlistDetails } = useWishlistContext();


  async function addProductToWishlist(productId:string) {
    const res = await addToWishlist(productId);

    if (res.success) {
      toast.success(res.message, {position: "top-center"})
      getWishlistDetails();
    } else {
      toast.error(res.message, {position: "top-center"})
    }
  }

return (<>

  <div 
    onClick={()=>addProductToWishlist(productId)} {...props} >
    <Heart />
  </div>
  </>
  )
}
