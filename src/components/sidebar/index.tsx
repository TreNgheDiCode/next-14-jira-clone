"use client";

import Image from "next/image";
import Link from "next/link";
import DottedSeparator from "../dottedSeparator";
import SidebarNavigation from "./navigation";
import WorkspaceSwitcher from "./workspaceSwitcher";
import ProjectsNavigation from "./projectsNavigation";

export default function Sidebar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <SidebarNavigation />
      <DottedSeparator className="my-4" />
      <ProjectsNavigation />
    </aside>
  );
}
