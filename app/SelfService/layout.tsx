import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import SideberManu from './SideberManu';




function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<SidebarProvider defaultOpen={false} >
        <SideberManu />
        {children}
    </SidebarProvider>)

}

export default Layout
