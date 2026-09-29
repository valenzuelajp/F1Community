import { withAuth } from "next-auth/middleware";

/**
 * Auth-aware routing (Auth V1).
 *
 * Guests can browse everywhere (the "Continue as Guest" flow depends on
 * it). Signed-in users hitting /login or /register are bounced to /home
 * instead of seeing a form they no longer need.
 */
export default withAuth(
  function middleware(req) {
    if (req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = "/home";
      url.search = "";
      return Response.redirect(url);
    }
    return undefined;
  },
  {
    callbacks: {
      // Let every request through — we only redirect, never block.
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/login", "/register"],
};
