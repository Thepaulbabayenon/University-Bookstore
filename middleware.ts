export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/trips",
    "/profile",
    "/cart",
    "/payment",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};
