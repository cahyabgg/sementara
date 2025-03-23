import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  console.log("Cookies:", allCookies);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", 
  ],
};
