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
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { useCartContext } from "@/context/CartContext";
import { CircleX } from "lucide-react"
import { toast } from "sonner"
import { clearCart, removeCartItem, updateQuantityCart } from "@/services/cart.services"

export default function CartPage() {

  const {cartDetails , setCartDetails } = useCartContext();
  async function clearAllCart() {
    const res = await clearCart();
    
    if (res?.message === "success") {
      toast.success("Cart removed successfully" ,{position: "top-center" })
      setCartDetails(null);
    } else {
      toast.success(res?.message || "Somthing went wrong" , {position: "top-center" })
    }
  }

  async function removeProductFromCart(productId:string) {
    const res = await removeCartItem(productId);
    if (res?.success) {
      toast.success(res?.message ,{position: "top-center" })
      setCartDetails(res.data);
    } else {
      toast.success(res?.message || "Somthing went wrong" , {position: "top-center" })
    }
  }
  

  async function updateQuantityCartFn(productId:string , count:number) {
    const res = await updateQuantityCart(productId , count);
    
    if (res?.success) {
      toast.success(res?.message ,{position: "top-center" })
      setCartDetails(res.data);
    } else {
      toast.success(res?.message || "Somthing went wrong" , {position: "top-center" })
    }
  }

  return (
  <section>
    <div className="container mx-auto lg:px-20">
      {cartDetails?.numOfCartItems && cartDetails?.numOfCartItems > 0 ? <>
      <section className="mb-20">
        <Table className="mb-6">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartDetails?.data?.products.map((product)=>(

            <TableRow key={product._id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-5 relative">
                  <CircleX onClick={()=>removeProductFromCart(product.product._id)}
                  className="absolute top-0 cursor-pointer text-white fill-red-600"/>
                  <Image src={product.product.imageCover}
                  alt={product.product.title}
                  width={54}
                  height={54}
                  />
                  <h2 className="whitespace-normal break-words w-[150px] lg:whitespace-nowrap lg:w-auto">{product.product.title}</h2>
                </div>
              </TableCell>
              <TableCell>{product.price}</TableCell>

              <TableCell>
                <div className="flex items-center gap-4">
                  <Button variant={'outline'} size={'sm'} className="cursor-pointer"
                  onClick={()=>updateQuantityCartFn(product.product._id, product.count + 1)} >+</Button>
                  {product.count}
                  <Button variant={'outline'} size={'sm'} className="cursor-pointer"
                  onClick={()=>updateQuantityCartFn(product.product._id, product.count - 1)} >-</Button>
                </div>
              </TableCell>

              <TableCell className="text-right">${product.count * product.price}</TableCell>
            </TableRow>
            ))}

          </TableBody>
        </Table>

        <div className="flex justify-between ">
          <Button variant={"outline"}>
            <Link href={'/products'}>Return To Shop</Link>
          </Button>
          <Button onClick={clearAllCart} variant={"destructive"} className="cursor-pointer">Remove All</Button>
        </div>
      </section>
      
      <section className="flex justify-between mb-5">
        <div className="flex items-center gap-4 w-5/12">
          <Input placeholder="Coupon Code"/>
          <Button variant={'destructive'} className="cursor-pointer">Apply Coupon</Button>
        </div>
        <div className="w-5/12 py-8 px-6 border border-gray-950">
          <h3 className="font-bold mb-6 text-xl">Cart Total</h3>
          <ul className="divide-y divide-gray-950">
            <li className="py-6 flex justify-between"><span>Subtotal</span> <span>{cartDetails.data.totalCartPrice}$</span></li>
            <li className="py-6 flex justify-between"><span>Shipping</span> <span>Free</span></li>
            <li className="py-6 flex justify-between"><span>Total</span> <span>{cartDetails.data.totalCartPrice}$</span></li>
          </ul>
          <div className="flex justify-center">
            <Button variant={'destructive'} className="cursor-pointer" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </div>
        </div>
      </section>
      </>
      :
      ( <section className="min-h-page flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold pb-10">Your Cart Is Empty !</h2>
        <Button variant={'destructive'} asChild className="w-fit">
          <Link href="/">Return to Shopping</Link>
        </Button>
      </div>
      </section>

      )}
    </div>
</section>
    
  )
}
