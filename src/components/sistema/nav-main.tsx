"use client"

import { type LucideIcon } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
type NavItem = {
    title: string
    icon: LucideIcon
    url?: string
    onClick?: () => void
}

type Props = {
    items: NavItem[]
}
export function NavMain({ items }: Props) {
    return (
        <SidebarMenu>
            {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                    {item.url ? (
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon className="h-5 w-5" />
                                {item.title}
                            </Link>
                        </SidebarMenuButton>
                    ) : (
                        <SidebarMenuButton onClick={item.onClick}>
                            <item.icon className="h-5 w-5" />
                            {item.title}
                        </SidebarMenuButton>
                    )}
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
