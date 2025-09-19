import { getUserOrders } from '@/services/order.services'
import React from 'react'
import AllordersBody from './AllordersBody'
import { IOrder } from '@/interface/allorders.interface';

export default async function OrdersPage() {
  const {data : orders}:{data: IOrder[]} = await getUserOrders();  
  return (
    <>
    <AllordersBody orders={orders}/>
    </>
  )
}
