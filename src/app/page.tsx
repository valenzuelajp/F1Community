import { redirect } from "next/navigation";

/**
 * Site entry point — the member home is the single landing page.
 * Login and register both land on /home after auth.
 */
export default function RootPage() {
  redirect("/home");
}
