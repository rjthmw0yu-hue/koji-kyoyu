"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ListIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  CommandIcon,
} from "lucide-react"

const data = {
  user: {
    name: "CEO室メンバー",
    email: "info@ai-path.jp",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "ホーム",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
    },
    {
      title: "タスク一覧",
      url: "/dashboard/tasks",
      icon: (
        <ListIcon />
      ),
    },
  ],
  navSecondary: [
    {
      title: "設定",
      url: "#",
      icon: (
        <Settings2Icon />
      ),
    },
    {
      title: "ヘルプ",
      url: "#",
      icon: (
        <CircleHelpIcon />
      ),
    },
    {
      title: "検索",
      url: "#",
      icon: (
        <SearchIcon />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <CommandIcon className="size-5!" />
              <span className="text-base font-semibold">外部対応タスク管理</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}