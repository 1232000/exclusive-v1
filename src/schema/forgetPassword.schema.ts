import * as z from "zod"

export const forgetFormSchema = z.object({
  email: z.email({message: "Please enter a valid email address ."}),
})
