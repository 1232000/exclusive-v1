"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import React from 'react'
import { IWishlistResponse } from "@/interface/wishlist.interface";
import { getUserWishlist } from "@/services/wishlist.services";

interface IWishlistContext {
  wishlistDetails: IWishlistResponse | null,
  setWishlistDetails: React.Dispatch<React.SetStateAction<IWishlistResponse | null>> ,
  getWishlistDetails: () => Promise<void>;
}

const WishlistContext = createContext<IWishlistContext | null>(null)


export default function WishlistContextProvider({children}:{children:ReactNode}) {
  const [wishlistDetails, setWishlistDetails] = useState<IWishlistResponse | null>(null)

  async function getWishlistDetails() {
    const res = await getUserWishlist();
    if (res.success && res.data) {
      setWishlistDetails(res.data);
    } else {
      setWishlistDetails(null);
  }  }


  useEffect(() => {
  getWishlistDetails();
  }, [])
  
  return (
    <WishlistContext.Provider value={{wishlistDetails, setWishlistDetails, getWishlistDetails }}>{children}</WishlistContext.Provider>
  )
}


export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if(!context){
    throw new Error("useWishlistContext must be used within a WishlistContextProvider");
    
  }
  return context;
}
