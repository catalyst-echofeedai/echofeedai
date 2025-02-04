import { redirect } from "react-router-dom";
import { getUserSession } from "@/services/sessions.server";

export const ROUTE_PATH = "/auth/signin" as const;

export async function loader(): Promise<Response | null> {
  // If user is already authenticated, redirect to dashboard
  const session = getUserSession();
  const isAuthenticated = session.getIsAuthenticated();
  if (isAuthenticated) {
    return redirect("/dashboard");
  }
  return null;
}
