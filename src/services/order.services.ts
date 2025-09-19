"use server";

import getUserToken , {getUserId} from "@/lib/server-utils";
import { addressFormStateType, checkoutFormSchema } from "@/schema/address.schema";

export async function handlePayment
(
   formState:addressFormStateType ,formData:FormData 
)  : Promise<addressFormStateType>{

  const shippnigAddress = {
    details: formData.get("details"),
    city: formData.get("city"),
    phone: formData.get("phone"),
};
    
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod") as "cash" | "card" ;
  
  const parseData = checkoutFormSchema.safeParse({...shippnigAddress , cartId , paymentMethod});
  if(!parseData.success){
    return{
      success: false,
      error: parseData.error?.flatten().fieldErrors,
      message: null,
      callbackUrl: '/cart',
    };
  }
  try {
    const token = await getUserToken();

    const endpoint = paymentMethod === "cash"
    ? `api/v1/orders/${cartId}`
    : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(shippnigAddress),
  },
);
    const data = await res.json();
    
    if (!res.ok) {
      return{
        success: false,
        error: {},
        message: data.message || "Failed to place order",
        callbackUrl: '/cart',
        paymentMethod,
      }
    }
    return{
      success: true,
      error: {},
      message: data.message || "Order placed successfully",
      callbackUrl: paymentMethod ==="cash" ? '/allorders' : data.session.url ,
      paymentMethod,
    }
} catch(error) {
      return{
        success: false,
        error: {},
        message: (error as string) || "Something went wrong",
      }
}}


export async function getUserOrders() {
    try {
        const userId = await getUserId();
        const res = await fetch(`${process.env.API_BASE_URL}/api/v1/orders/user/${userId}` , {
            headers:{
              "Content-Type": "application/json",
            },
        },);

        const data = await res.json();

        if (!res.ok) {
        return {
          data: null,
          success: false,
          message: data.message || "Error in Fetching the orders",
        } ;
      }
        return {
          data: data,
          success: true,
          message: data.message || "Fetched orders successfully",
        } ;
    } catch(error) {
        return {
          data: null,
          success: false,
          message: error as string ||"Something went wrong",
        }}
}
