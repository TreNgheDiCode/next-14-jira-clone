"use client";

import DottedSeparator from "@/components/dottedSeparator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ArrowLeftIcon, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { useGetMembers } from "../hooks/use-get-members";
import MemberAvatar from "./memberAvatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "../hooks/use-delete-member";
import { useUpdateMember } from "../hooks/use-update-member";
import { MemberRole } from "../types";
import useConfirm from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

export default function MembersList() {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetMembers({ workspaceId });
  const router = useRouter();
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Remove member",
    "Are you sure you want to remove this member from the workspace?",
    "destructive"
  );
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({ json: { role }, param: { memberId } });
  };

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card className="size-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            disabled={isDeletingMember || isUpdatingMember}
            variant="secondary"
            size="sm"
            asChild
          >
            <Link href={`/workspaces/${workspaceId}`}>
              <ArrowLeftIcon className="mr-2 size-4" />
              Back
            </Link>
          </Button>
          <CardTitle className="text-xl font-bold">Members list</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="w-16 h-2 rounded-full" />
                <Skeleton className="w-12 h-2 rounded-full" />
              </div>
            </div>
            <Skeleton className="size-8 border-neutral-200 border rounded-md" />
          </div>
          <Separator className="my-2.5" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="w-16 h-2 rounded-full" />
                <Skeleton className="w-12 h-2 rounded-full" />
              </div>
            </div>
            <Skeleton className="size-8 border-neutral-200 border rounded-md" />
          </div>
          <Separator className="my-2.5" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="w-16 h-2 rounded-full" />
                <Skeleton className="w-12 h-2 rounded-full" />
              </div>
            </div>
            <Skeleton className="size-8 border-neutral-200 border rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="size-full border-none shadow-none">
      <DeleteDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button
          disabled={isDeletingMember || isUpdatingMember}
          variant="secondary"
          size="sm"
          asChild
        >
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="mr-2 size-4" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members list</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={isDeletingMember || isUpdatingMember}
                    variant="secondary"
                    size="icon"
                    className="ml-auto"
                  >
                    <MoreVertical className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.ADMIN)
                    }
                    disabled={isDeletingMember || isUpdatingMember}
                  >
                    Set as Administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.MEMBER)
                    }
                    disabled={isDeletingMember || isUpdatingMember}
                  >
                    Set as Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700"
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={isDeletingMember || isUpdatingMember}
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
