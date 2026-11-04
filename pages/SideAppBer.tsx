'use client'
import { Sidebar, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarMenu, SidebarContent, useSidebar, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar'
import { ArrowLeftRight, ChevronLeft, ChevronRight, ClipboardCheck, Clock, Home, } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

export type MenuItem = {
    title: string;
    href?: string;
    icon?: LucideIcon;
    subMenu?: MenuItem[];
};



function SideAppBer({ className, menuItems }: { className?: string; menuItems: MenuItem[] }) {
    const { open } = useSidebar();
    const pathname = usePathname();

    console.log(pathname);

    return (
        <Sidebar className={className} collapsible="icon" >
            <SidebarHeader>
                <CustomSidebarTrigger></CustomSidebarTrigger>
            </SidebarHeader>
            <SidebarContent >
                <SidebarMenu className={`overflow-hidden transition-all duration-300 ${open
                    ? "visible w-full opacity-100"
                    : "invisible w-0 opacity-0"
                    }`} >
                    {menuItems.map((item, index) => {
                        const IconComponent = item.icon;
                        if (item.subMenu && item.subMenu.length > 0)
                            return (
                                <Collapsible key={item.title + index} className="group/collapsible">
                                    <SidebarMenuItem className="cursor-pointer"  >
                                        <CollapsibleTrigger className='w-full ' render={
                                            <SidebarMenuButton className="cursor-pointer" tooltip={item.title}>
                                                {IconComponent && <IconComponent />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>} />
                                        {/* Render the sub-menu items */}
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {
                                                    item.subMenu.map((subItem, subIndex) => {
                                                        const SubIconComponent = subItem.icon;
                                                        return (
                                                            <SidebarMenuSubItem key={subItem.title + subIndex}>
                                                                <SidebarMenuSubButton
                                                                    render={<Link href={subItem.href || ""} />}
                                                                    isActive={pathname === subItem.href}
                                                                >
                                                                    {SubIconComponent && <SubIconComponent />}
                                                                    <span>{subItem.title}</span>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        )
                                                    })
                                                }
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        return (
                            <SidebarMenuItem key={item.title + index}>
                                <SidebarMenuButton className="cursor-pointer data-[active=true]:bg-primary data-[active=true]:text-primary-foreground " isActive={pathname === item.href} render={<Link href={item.href || ""} />}  >
                                    {IconComponent && <IconComponent />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

export default SideAppBer



export function CustomSidebarTrigger() {
    const { open, toggleSidebar } = useSidebar();

    return (
        <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="inline-flex size-6 ml-1 transition-all duration-200 items-center cursor-pointer hover:border-primary border justify-center rounded-full hover:text-primary"
        >
            {open ? (
                <ChevronLeft className={open ? 'pr-0.5' : ""} />
            ) : (
                <ChevronRight className={open ? "" : 'pl-0.5'} />
            )}
        </button>
    );
}
