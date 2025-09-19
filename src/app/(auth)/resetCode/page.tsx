"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { resetCodeFormSchema } from '@/schema/resetCode.schema'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'

export default function ResetCode() {

const router = useRouter();
type ResetCodeFormValues = z.infer<typeof resetCodeFormSchema>

const form = useForm<ResetCodeFormValues>({
    resolver: zodResolver(resetCodeFormSchema),
    defaultValues: {
      resetCode: "",
    } ,
  })


async function handleResetCode(values: ResetCodeFormValues) {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verifyResetCode` , {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
      },
  );
      const data = await res.json();
      console.log(data);
      if(data.status === 'Success'){
        
        toast.success(data?.status, { position: "top-center" })
        router.push('/resetPassword')
      } else {
            toast.error(data?.message, { position: "top-center" })
        }

  } catch(error) {
      console.log(error);
  }
}

  return (<>
  <section className='container mx-auto p-20'>
    <div className='max-w-2xl  mx-auto p-20 g-orange-200 rounded-lg'>
      <h1 className='text-3xl font-bold mb-8'>Reset Code</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetCode)} className="space-y-8">
  {/* Email=========================================*/}
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code : </FormLabel>
                <FormControl>

                    <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                    </InputOTP>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='cursor-pointer' type="submit">Verify Code</Button>

        </form>
      </Form>
    </div>
  </section>
  </>
  )
}
