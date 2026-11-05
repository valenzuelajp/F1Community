import { redirect } from "next/navigation";

/**
 * Site entry point — /home is the single landing page, public for guests
 * and members alike (the "Continue as Guest" flow depends on it).
 * Login and register both land on /home after auth; the middleware
 * bounces signed-in users off /login and /register back here.
 */
export default function RootPage() {
  redirect("/home");
}
