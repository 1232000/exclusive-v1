"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import * as z from "zod"
import { handleRegister } from '@/services/register.services'
import { formState, registerFormSchema } from '@/schema/register.schema'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'



export default function RegisterPage() {

const [action , formAction] = useActionState(handleRegister , formState)
const [loading, setLoading] = useState(false);
const [hidePassword, setHidePassword] = useState<boolean>(true);
const [hideRePassword, setHideRePassword] = useState<boolean>(true);

const router = useRouter();


type RegisterFormValues = z.infer<typeof registerFormSchema>


const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })

  useEffect(()=>{
    if(action){
      if(!action.success && action.message){
        setLoading(true)
        toast.error(action.message ,{ position: "top-center" });
        setLoading(false)
      }
      if(action.success && action.message){
        setLoading(true)
        toast.success(action.message ,{ position: "top-center" });
        router.push("/login");
        setLoading(false)
      }
    }
    
  },[action, router])


  return (<>
  <section className='container mx-auto p-20'>
    <div className='max-w-2xl  mx-auto p-20 g-orange-200 rounded-lg'>
      <h1 className='text-3xl font-bold mb-8'>Register</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-8">
  {/* Name=========================================*/}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Userame</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="malak" {...field} />
                </FormControl>
                <FormMessage>{action.error?.name?.[0]}</FormMessage>
              </FormItem>
            )}
          />
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
                <FormMessage>{action.error?.email?.[0]}</FormMessage>
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
                <FormMessage>{action.error?.password?.[0]}</FormMessage>
              </FormItem>
            )}
          />
  {/* rePassword=========================================*/}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input autoComplete='off' type={hideRePassword?'password':'text'} placeholder="********" {...field} />
                    <Eye onClick={()=>{setHideRePassword(false)}} className={`cursor-pointer absolute top-2 end-2 ${hideRePassword?'block':"hidden"}`}/>
                    <EyeOff onClick={()=>{setHideRePassword(true)}} className={`cursor-pointer absolute top-2 end-2 ${hideRePassword?'hidden':"block"}`}/>
                  </div>
                  </FormControl>
                <FormMessage>{action.error?.rePassword?.[0]}</FormMessage>
              </FormItem>
            )}
          />
  {/* Phone=========================================*/}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type='tel' placeholder="01234567890" {...field} />
                </FormControl>
                <FormMessage>{action.error?.phone?.[0]}</FormMessage>
              </FormItem>
            )}
          />

          <Button className='cursor-pointer' type="submit"
            disabled={loading}
            >
            {loading ? "Loading..." : "Submit"}
          </Button>

        </form>
      </Form>
    </div>
  </section>
  </>
  )
}