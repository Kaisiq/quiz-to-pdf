import { geolocation } from "@vercel/functions";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) await auth.protect()
  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/") {
    const country =
      geolocation(req)?.country?.toLowerCase() !== "bg" ? "en" : "bg";
    req.nextUrl.pathname = `/${country}`;
    return NextResponse.rewrite(req.nextUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
