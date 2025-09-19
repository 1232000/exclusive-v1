import * as z from "zod"


export const resetPasswordFormSchema = z.object({
  email: z.email({message: "Please enter your valid email address ."}),
  newPassword: z.string().nonempty({message: "Reset Password is required"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    , "Invalid Password"),})

