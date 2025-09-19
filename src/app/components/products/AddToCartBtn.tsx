"use client"
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/context/CartContext';
import { addToCart } from '@/services/cart.services';
import { LoaderCircle } from 'lucide-react';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

export default function AddToCartBtn(
  {productId, ...props} :
  {productId: string;
    [key: string]:string;
  } ) {

    const [isPending , startTransition] = useTransition()
  const {getCartDetails} = useCartContext();

  async function addProductToCart(productId:string) {
    startTransition(async() => {
      const res = await addToCart(productId);

      if (res.success) {
        toast.success(res.message, {position: "top-center"})
        getCartDetails();
      } else {
        toast.error(res.message, {position: "top-center"})
      }
    })
  }

return (<>
  <Button disabled={isPending}
    onClick={()=>addProductToCart(productId)} {...props} >
    {isPending? <LoaderCircle className='animate-spin' /> : "Add To Cart"}
    </Button>
  </>
  )
}
