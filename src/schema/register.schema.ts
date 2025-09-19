import * as z from "zod"

export const registerFormSchema = z.object({
  name: z.string().min(3 , "Name must be 3–30 characters").max(30 , "Name must be 3–30 characters"),
  email: z.email({message: "Please enter a valid email address ."}),
  password: z.string().nonempty({message: "Password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    , "Password must contain at least 8 characters,one uppercase letter, one lowercase letter, one number and one special character"),
  rePassword: z.string().nonempty({message: "Confirm Password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Confirm Password must match the password entered above."),
  phone : z.string().nonempty({message: "Phone number is required"}).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ , "Invalid phone number")
  }).refine((data) => data.password === data.rePassword,{
    message: "Passwords don't match",
    path: ['rePassword'],
  });


export const formState = {
  success: false,
  error: {},
  message: null,
}; 

export type formStateType ={
  success: boolean ;
  error: {
    name?:string[];
    email?:string[];
    password?:string[];
    rePassword?:string[];
    phone?:string[];
  };
  message: string | null ;
}