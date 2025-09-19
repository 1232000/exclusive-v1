import { ICartProductDetails } from "./cart.interface"
import { IPagination } from "./pagination.interface"

export interface IProductResponse {
  results: number
  metadata: IPagination
  data: IOrder[]
}

export interface IOrder {
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: ICartProductDetails[]
  createdAt: string
  updatedAt: string
  id: number
  shippingAddress?: ShippingAddress
  paidAt?: string
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}
