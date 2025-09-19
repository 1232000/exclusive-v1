import * as z from "zod"

export const loginFormSchema = z.object({
  email: z.email({message: "Please enter a valid email address ."}),
  password: z.string().nonempty({message: "Password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    , "Invalid Password"),})

