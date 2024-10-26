"use client";

import DottedSeparator from "@/components/dottedSeparator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useJoinWorkspace } from "../hooks/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";

export default function JoinWorkspaceForm({
  initialValues,
}: {
  initialValues: { name: string };
}) {
  const { mutate, isPending } = useJoinWorkspace();
  const code = useInviteCode();
  const workspaceId = useWorkspaceId();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code },
      },
      {
        onSuccess: () => {},
      }
    );
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bol">Join workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join the workspace{" "}
          <strong>{initialValues.name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          <Button
            className="w-full lg:w-fit"
            variant="secondary"
            type="button"
            size="lg"
            asChild
            disabled={isPending}
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            size="lg"
            type="button"
            className="w-full lg:w-fit"
            onClick={onSubmit}
            disabled={isPending}
          >
            Join workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
