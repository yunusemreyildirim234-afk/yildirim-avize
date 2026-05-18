export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/hesabim/:path*",
    "/siparislerim/:path*",
    "/sepet/adres/:path*",
  ],
};