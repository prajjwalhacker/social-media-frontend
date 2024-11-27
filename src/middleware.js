import { NextResponse } from 'next/server'

 

export function middleware(request) {
  
  // const refreshToken = request.cookies.get('refreshToken');
  // if (!refreshToken) {
  //    return NextResponse.redirect(new URL('/', request.url))
  // }
  
  return NextResponse.next();
}
 

export const config = {
    matcher: '/dashboard/:path*', 
}