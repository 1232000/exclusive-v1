"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { resetPasswordFormSchema } from '@/schema/resetPassword.schema';
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPassword() {

const router = useRouter();
const [loading, setLoading] = useState<boolean>(false);
const [hidePassword, setHidePassword] = useState<boolean>(true);

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>

const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    } ,
  })


async function handleResetPassword(values: ResetPasswordFormValues) {
  try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword` , {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
              "Content-Type": "application/json",
          },
      },
  );
      
      const data = await res.json();
      setLoading(true);
      if(data.token){
        toast.success(data?.message, { position: "top-center" });
        setLoading(false);
        router.push('/login');
          } else {
          setLoading(false);
            toast.error(data?.message, { position: "top-center" });
        }
  } catch(error) {
      console.log(error);
  }
}

  return (<>
  <section className='container mx-auto p-20'>
    <div className='max-w-2xl  mx-auto p-20 g-orange-200 rounded-lg'>
      <h1 className='text-3xl font-bold mb-8'>Reset Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-8">
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
   {/* Neew Password========================================= */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input autoComplete='off' type={hidePassword?'password':'text'} placeholder="********" {...field} />
                    <Eye onClick={()=>{setHidePassword(false)}} className={`cursor-pointer absolute top-2 end-2 ${hidePassword?'block':"hidden"}`}/>
                    <EyeOff onClick={()=>{setHidePassword(true)}} className={`cursor-pointer absolute top-2 end-2 ${hidePassword?'hidden':"block"}`}/>
                  </div>
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

