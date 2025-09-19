"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import * as z from "zod"
import { toast } from 'sonner'
import { addressFormState, checkoutFormSchema } from '@/schema/address.schema'
import { handlePayment } from '@/services/order.services'
import { useCartContext } from '@/context/CartContext'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"



export default function CheckoutPage() {
const { cartDetails, setCartDetails } = useCartContext()
const [action , formAction] = useActionState (handlePayment , addressFormState)
const [loading, setLoading] = useState(false);
const router = useRouter();

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>


const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      cartId:"",
      details: "",
      city: "",
      phone: "",
      paymentMethod:"cash",
    },
  })

  useEffect(()=>{
    let timeout: NodeJS.Timeout;
    if(action){
      if(action.success && action.message){
        if(action.paymentMethod === 'cash'){
          setLoading(true)
          toast.success(action.message ,{ position: "top-center" });
          setCartDetails(null);
          setLoading(false)
          timeout = setTimeout(() => {
            router.push(action.callbackUrl || '/allorders');
          }, 2000);
        }else{
          window.location.href = action.callbackUrl as string;
        }
      } else if(!action.success && action.message){
        toast.error(action.message ,{ position: "top-center" });
      }
    }
    
    return () =>{
      if(timeout){
        clearTimeout(timeout);
      }
    }
  },[action, router , setCartDetails, form])

  useEffect(()=>{
    if(cartDetails){
      form.setValue("cartId", cartDetails.cartId)
    }
    
  },[cartDetails , form])

  return (<>
  <section className='container mx-auto p-20'>
    <div className='max-w-2xl  mx-auto rounded-lg'>
      <h1 className='text-3xl font-bold mb-8'>Checkout</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
  {/* =========================================*/}
          <FormField
            control={form.control}
            name="cartId"
            render={({ field }) => (
              <div className='hidden'>
                <FormItem>
                  <FormControl>
                    <Input {...field} value={cartDetails?.cartId}/>
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
  {/* Name=========================================*/}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Details</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="home address" {...field} />
                </FormControl>
                <FormMessage>{action.error?.details?.[0]}</FormMessage>
              </FormItem>
            )}
          />
  {/* Email=========================================*/}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your City</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="Alexandria" {...field} />
                </FormControl>
                <FormMessage>{action.error?.city?.[0]}</FormMessage>
              </FormItem>
            )}
          />

  {/* Phone=========================================*/}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type='tel' placeholder="01234567890" {...field} />
                </FormControl>
                <FormMessage>{action.error?.phone?.[0]}</FormMessage>
              </FormItem>
            )}
          />

  {/* Payment Method=========================================*/}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <RadioGroup
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  name={field.name} >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Card</Label>
                  </div>
                </RadioGroup>
                <FormMessage>{action.error?.paymentMethod?.[0]}</FormMessage>
              </FormItem>
            )}
          />
  {/*=======================================================================*/}
          <Button className='cursor-pointer' type="submit"
            disabled={loading}
            >
            {loading ? "Loading..." : "Submit"}
            
          </Button>

        </form>
      </Form>
    </div>
  </section>
  </>
  )
}