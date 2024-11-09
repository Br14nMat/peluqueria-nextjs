import { NextRequest, NextResponse } from "next/server";


export default function middleware(request: NextRequest){

    if(!request.cookies.get("currentUser")?.value && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register')
        return NextResponse.redirect(new URL("/login", request.url));

    if(!request.cookies.get("currentUser"))
        return
    
    const currentUser = JSON.parse(request.cookies.get("currentUser")?.value || '');
    const token = currentUser?.token
    const role = currentUser?.role

    const { pathname }: { pathname: string } = request.nextUrl;

    const Redirect = () => {
        if(role == "client") return NextResponse.redirect(new URL("/", request.url))
        else if (role == "hairdresser") return NextResponse.redirect(new URL("/hairdresser", request.url))
        else if (role == "admin") return NextResponse.redirect(new URL("/admin", request.url))
        else return NextResponse.redirect(new URL("/not-found", request.url))
    }

    const authRoutes = ["/login", "/register"];

    if (!!token && authRoutes.includes(pathname)) {
        return Redirect();
    }
    
    if (
        (!!token && pathname.startsWith("/admin") && role !== "admin") ||
        (!!token && pathname.startsWith("/haidresser") && role !== "haidresser") ||
        (!!token && !pathname.startsWith("/admin") && !pathname.startsWith("/peluquero") && role !== "client")
    ){
        return Redirect();
    }

}


export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}