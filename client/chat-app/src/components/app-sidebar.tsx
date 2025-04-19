'use client';

import React, { useEffect, useState } from 'react';
import {
  Command,
  MessageCircle,
  Send,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import { NavUser } from "@/components/nav-user"
import { useUser } from "@/hooks/use-getUserById"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('_id');
    if (id) {
      setUserId(id);
    }
  }, []);

  const { user, error, isLoading } = useUser(userId || "");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;
  if (!user) return <div>No user found.</div>;

  if (isLoading || !user) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  // This is sample data.
  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: Command,
        plan: "Enterprise",
      },
    ],
    navMain: [

      {
        title: "Messages",
        url: "/message",
        icon: MessageCircle,
        isActive: true,
      },
      {
        title: "Send Message",
        url: "/send",
        icon: Send,
        badge: "10",
      },
    ],
  }
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
