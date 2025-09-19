"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { forgetFormSchema } from '@/schema/forgetPassword.schema'
import { toast } from 'sonner'

export default function ForgetPassword() {

const [loading, setLoading] = useState(false);

const router = useRouter();
type ForgetFormValues = z.infer<typeof forgetFormSchema>

const form = useForm<ForgetFormValues>({
    resolver: zodResolver(forgetFormSchema),
    defaultValues: {
      email: "",
    } ,
  })


async function handleForgetPassword(values: ForgetFormValues) {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords` , {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
      },
  );
      const data = await res.json();

      if(data.statusMsg === 'success'){
        console.log(data);
        setLoading(true);
        toast.success(data?.message, { position: "top-center" })
        setLoading(false);
        router.push('/resetCode')
      } else {
            setLoading(false);
            toast.error(data?.message, { position: "top-center" })
        }

  } catch(error) {
      console.log(error);
  }
  }

  return (<>
  <section className='container mx-auto p-20'>
    <div className='max-w-2xl  mx-auto p-20 g-orange-200 rounded-lg'>
      <h1 className='text-3xl font-bold mb-8'>Forgot Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgetPassword)} className="space-y-8">
  {/* Email=========================================*/}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder="username@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='cursor-pointer' type="submit"
            disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </Button>
          
          
        </form>
      </Form>
    </div>
  </section>
  </>
  )
}
