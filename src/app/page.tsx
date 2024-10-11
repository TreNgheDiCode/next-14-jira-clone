import { getCurrentUser } from "@/features/auth/actions";
import UserButton from "@/features/auth/components/userButton";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  return (
    <div>
      <UserButton />
    </div>
  );
}
