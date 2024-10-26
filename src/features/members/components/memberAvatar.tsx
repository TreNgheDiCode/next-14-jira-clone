"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export default function MemberAvatar({
  name,
  className,
  fallbackClassName,
}: Props) {
  return (
    <Avatar
      className={cn(
        "size-5 transition border border-neutral-300 rounded-full",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name[0].charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
