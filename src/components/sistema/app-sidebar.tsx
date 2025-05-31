"use client"

import React, { useState } from "react"
import {
    ArrowUpCircleIcon,
    LayoutDashboardIcon,
    ListIcon,
    PlusCircleIcon,
} from "lucide-react"

import { NavMain } from "@/components/sistema/nav-main"
import { NavUser } from "@/components/sistema/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./toggle"
import { User } from "@/types/User";
import { CreateIncomeDialog } from "./create-income"
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    user: User;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
    const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);


    const data = {
        user: user,
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboardIcon,
            },
            {
                title: "Adicionar renda",
                icon: PlusCircleIcon,
                onClick: () => setIncomeDialogOpen(true),
                render: () => (
                    <CreateIncomeDialog
                        key={1}
                        title="Adicionar renda"
                        icon={PlusCircleIcon}
                        open={incomeDialogOpen}
                        setOpen={setIncomeDialogOpen}
                    />
                ),
            }
        ],



    }
    return (
        <>
            <Sidebar collapsible="offcanvas" {...props}>
                <SidebarHeader>
                    <ModeToggle />
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <a href="#">
                                    <ArrowUpCircleIcon className="h-5 w-5" />
                                    <span className="text-base font-semibold">Ecn</span>
                                </a>



                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={data.navMain} />


                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={user} />
                </SidebarFooter>
            </Sidebar>
            {/* ⬇️ Aqui está o render dos diálogos ou componentes extras */}
            {data.navMain.map((item, index) => item.render && item.render())}
        </>
    )
}
