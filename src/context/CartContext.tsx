"use client"
import { getUserCart } from "@/services/cart.services"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import React from 'react'
import { ICartResponse } from './../interface/cart.interface';

interface ICartContext {
  cartDetails: ICartResponse | null,
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>> ,
  getCartDetails: () => Promise<void>;
}

const CartContext = createContext<ICartContext | null>(null)

export default function CartContextProvider({children}:{children:ReactNode}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null)

  async function getCartDetails() {
    const {data}:{data:ICartResponse} = await getUserCart();
    setCartDetails(data);
}
  useEffect(() => {
  getCartDetails();
  }, [])
  
  return (
    <CartContext.Provider value={{cartDetails , setCartDetails ,getCartDetails}}>{children}</CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext);

  if(!context){
    throw new Error("useCartContext must be used within a CartContextProvider");
    
  }
  return context;
}