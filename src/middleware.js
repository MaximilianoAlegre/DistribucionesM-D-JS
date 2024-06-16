export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };
export const config = {
  matcher: [
    "/products/edit/:path*",
    "/categories/edit/:path*",
    "/auth/register",
    "/newcategory",
    "/new",
    "/admin",
    "/Admin",
  ],
  callbacks: {
    authorized({ req, token }) {
      if (token) return true; // If there is a token, the user is authenticated
    },
  },
};
