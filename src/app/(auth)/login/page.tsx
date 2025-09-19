"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {signIn} from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { loginFormSchema } from '@/schema/login.schema'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {

const [loading, setLoading] = useState<boolean>(false);
const [hidePassword, setHidePassword] = useState<boolean>(true);

type LoginFormValues = z.infer<typeof loginFormSchema>
const router = useRouter();

const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


async function onSubmit(values: LoginFormValues) {
    try {
      setLoading(true);
      const res = await signIn('credentials' ,{
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      })
      
      if(res?.ok){
        toast.success("Success",{ position: "top-center" });
        router.push("/");
        setLoading(false);
      }else{
        toast.error(res?.error || "Something Went Wrong" ,{
          position: "top-center",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  }

  return (<>
  <section className='container mx-auto p-20'>
    <div className='max-w-2xl  mx-auto p-20 g-orange-200 rounded-lg'>
      <h1 className='text-3xl font-bold mb-8'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

  {/* Password=========================================*/}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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

          <div className="flex">
          <Button className='cursor-pointer' type="submit"
            disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>

          <Link href={'/forgetPassword'} className='ms-auto underline text-md text-red-600' >Forget Password</Link>

          </div>
        </form>
      </Form>
    </div>
  </section>
  </>
  )
}
