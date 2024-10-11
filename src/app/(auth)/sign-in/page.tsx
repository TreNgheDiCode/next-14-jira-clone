import { getCurrentUser } from "@/features/auth/queries";
import SignInCard from "@/features/auth/components/signInCard";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return <SignInCard />;
}
