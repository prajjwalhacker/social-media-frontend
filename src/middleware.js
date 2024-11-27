import { NextResponse } from 'next/server'
import Cookies from 'js-cookie';

 

export function middleware(request) {
  
  const refreshToken = request.cookies.get('refreshToken');
  if (!refreshToken) {
     return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next();
}
 

export const config = {
    matcher: '/dashboard/:path*', 
}