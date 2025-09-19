"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { Banknote, Bike} from "lucide-react"
import { IOrder } from '@/interface/allorders.interface'

export default function AllordersBody({orders}:{orders:IOrder[]}) {

  return (
  <section>
    <div className="container mx-auto lg:px-20">
      {orders?
      <>
      <section className="mb-20">
        <Table className="mb-6">
          <TableHeader>
            <TableRow>
              <TableHead>order number</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead>payment</TableHead>
              <TableHead>total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {orders?.map((order)=>(
            <TableRow key={order._id}>

              <TableCell>
                <div className="bg-gray-300 w-fit p-2 rounded-lg font-bold">
                  {order?.id}
                </div>
              </TableCell>

              <TableCell>
                {order?.isDelivered==true? 
                <div className="flex gap-1">Yes <Bike className='text-green-600'/></div>  
                : 
                <div className="flex gap-1">No <Bike className='text-red-600'/></div>  
                }
              </TableCell>

              <TableCell>
                {order?.isPaid==true? 
                <div className="flex gap-1">yes <Banknote className='fill-green-900 text-green-600'/></div>  
                : "no"}
              </TableCell>

              <TableCell>
                {order?.shippingPrice}
              </TableCell>

              <TableCell>
                {order?.paymentMethodType}
              </TableCell>

              <TableCell className="text-start">
                <div className="text-red-500 text-lg">
                  {order?.totalOrderPrice} $
                </div>
              </TableCell>
            </TableRow>
            )
            )}

          </TableBody>
        </Table>

        <div className="flex justify-between ">
          <Button variant={"destructive"}>
            <Link href={'/products'}>Go To Shopping</Link>
          </Button>
        </div>
      </section>
      </>
      : 
        (
          <section className="min-h-page flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold pb-10">You did nt order yet !</h2>
        <Button variant={'destructive'} asChild className="w-fit">
          <Link href="/">Return to Shopping</Link>
        </Button>
      </div>
      </section>
      ) 
      }  
    </div>
</section>
  )
}
