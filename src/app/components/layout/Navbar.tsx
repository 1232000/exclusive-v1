"use client";

import { Heart, MenuIcon, ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const links = [
  {name:"Home", pathname:"/"},
  {name:"Products", pathname:"/products"},
  {name:"Categories", pathname:"/categories"},
  {name:"Brands", pathname:"/brands"},
  {name:"All Orders", pathname:"/allorders"},
]

const Navbar = () => {
  const path = usePathname() ;
  const { data: session, status } = useSession();
  
  const {cartDetails} = useCartContext();
  const {wishlistDetails} = useWishlistContext();
  
  return (
    <section className="py-4 shadow-lg z-50 fixed top-0 start-0 end-0  bg-white"> 
      <div className="container mask-auto px-20">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <span className="text-lg font-semibold tracking-tighter">
              Exclusive
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {links.map((link , index) =>(
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={link.pathname}
                  className={cn(navigationMenuTriggerStyle() , path === link.pathname?"border-0 border-gray-700 rounded-b-none border-b-2 ":"")}
                >{link.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
              )
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {status === "loading"? <span>Loading...</span> 
            :(status === "unauthenticated"? 
            <>
            
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User className="size-8 cursor-pointer"/>
                  </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Login Please...</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href="/login">Sign in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register">Sign up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </>
            :
            <>
            <div className="flex items-center gap-4">
              <Link className="relative" href={"/wishlist"}>
                {wishlistDetails && (<Badge
                  className="absolute -top-2 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive" >{wishlistDetails?.count}
                </Badge>)}
                <Heart className="size-8"/>
              </Link>

              <Link className="relative" href={"/cart"}>
                {cartDetails &&
                (<Badge
                  className="absolute -top-2 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive" >
                    {cartDetails?.numOfCartItems}
                </Badge>)
                } 
                <ShoppingCart className="size-8"/>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="pe-8">
                  <User className="size-8 cursor-pointer"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                
                    side="bottom"
                    align="end"
                  className="max-w-[200px] break-words"
                >
                  <DropdownMenuLabel>{session?.user!.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-gray-500 truncate">{session?.user!.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={()=>signOut({callbackUrl: '/login'})}>
                    Sign out
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            </>)}

          </div>



          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader >
                <SheetTitle className="flex justify-between">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                  >
                    <span className="text-lg font-semibold tracking-tighter">
                      Exclusive
                    </span>
                  </Link>


          <div className="mt-6 flex flex-col gap-4">
            {status === "loading"? <span>Loading...</span> 
            :(status === "unauthenticated"? 
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User className="size-8 cursor-pointer"/>
                  </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="start"
                    className="max-w-[20px] break-words">
                  <DropdownMenuLabel>Login Please...</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href="/login">Sign in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/register">Sign up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </>
            :
            <>
            <div className="flex items-center gap-4">
              <Link className="relative" href={"/wishlist"}>
                {wishlistDetails && (<Badge
                  className="absolute -top-2 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive" >{wishlistDetails?.count}
                </Badge>)}
                <Heart className="size-8"/>
              </Link>

              <Link className="relative" href={"/cart"}>
                {cartDetails &&
                (<Badge
                  className="absolute -top-2 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive" >
                    {cartDetails?.numOfCartItems}
                </Badge>)
                } 
                <ShoppingCart className="size-8"/>
              </Link>
              
              <DropdownMenu >
                <DropdownMenuTrigger>
                  <User className="size-8 cursor-pointer"/>
                  </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="start"
                  className="max-w-[20px] break-words"
                >
                  <DropdownMenuLabel>{session?.user!.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-gray-500 truncate max-w-[50px]">{session?.user!.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={()=>signOut({callbackUrl: '/login'})}>
                    Sign out
                    
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>
            </>)}
          </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {links.map((link , index) =>(
                  <Link key={index} href={link.pathname} className={cn('font-medium w-fit p-1 rounded-md' , path === link.pathname?"border-0 border-gray-700 rounded-b-none border-b-2 ":"")}>
                    {link.name}
                  </Link>
                  )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};
export default Navbar;