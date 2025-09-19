import * as z from "zod"

export const resetCodeFormSchema = z.object({
  resetCode: z.string().nonempty("Reset Code is required")
})

