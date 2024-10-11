import { getCurrentUser } from "@/features/auth/actions";
import SignUpCard from "@/features/auth/components/signUpCard";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return <SignUpCard />;
}
