import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export default async function middleware(request: NextRequest) {

  const token = await getToken({req: request});
  const { pathname } = request.nextUrl;
  const authRoutes = ['/login' , '/register' , '/forgetPassword' , '/resetCode' , '/resetPassword']
  const protectedRoutes = ['/cart' ,'/wishlist' , '/profile','/checkout' , '/allorders']

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
    
  } 
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next();
}
 
export const config = {
  matcher: ["/cart", "/cart/(.*)" , '/wishlist' , "/login", "/register", '/forgetPassword' , '/resetCode' , '/resetPassword', '/allorders','/checkout'],
}
