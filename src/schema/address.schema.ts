import * as z from "zod"

export const checkoutFormSchema = z.object({

  cartId: z.string().nonempty({message: "cartId is required"}),

  details: z.string().min(3 , "Adderss must be 3–30 characters").max(30 , "Adderss must be 3–30 characters"),

  city: z.string().min(2 , "City must be 2–50 characters").max(50 , "City must be 2–50 characters"),

  phone : z.string().nonempty({message: "Phone number is required"}).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ , "Invalid phone number"),
  
  paymentMethod: z.enum(["cash" , "card"], {message: "Payment method is required"}),
  })


export const addressFormState = {
  success: false,
  error: {
    cartId:[],
    details:[],
    city:[],
    phone:[],
    paymentMethod:[],
  },
  message: null,
  callbackUrl: '',
  // paymentMethod:'',
}; 

export type addressFormStateType ={
  success: boolean ;
  error: {
    cartId?:string[];
    details?:string[];
    city?:string[];
    phone?:string[];
    paymentMethod?:string[];
  };
  message: string | null ;
  callbackUrl?: string;
  paymentMethod?:"cash" | "card";
}