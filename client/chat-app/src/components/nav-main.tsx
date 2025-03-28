"use client"

import { type LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  const router = useRouter();
  const handleNavigation = (url: string) => {
    router.push(url);
  };
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <button
              type="button"
              onClick={() => handleNavigation(item.url)}
              className="flex items-center gap-2"
            >
              <item.icon />
              <span>{item.title}</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
