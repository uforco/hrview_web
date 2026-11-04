'use client'
import SideAppBer, { MenuItem } from '@/pages/SideAppBer'
import {
    Home,
    UserRound,
    Clock,
    CalendarCheck,
    CalendarDays,
    HandCoins,
    ClipboardCheck,
    ArrowLeftRight,
} from "lucide-react";



const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        icon: Home,
        href: "/SelfService",
    },
    {
        title: "About",
        icon: UserRound,
        href: "/SelfService/about",
    },
    {
        title: "Time Management",
        icon: Clock,
        subMenu: [
            {
                title: "Attendance Adjustment",
                icon: ClipboardCheck,
                href: "/SelfService/time-management/attendance-adjustment",
            },
            {
                title: "Shift Change",
                icon: ArrowLeftRight,
                href: "/SelfService/time-management/shift-change",
            },
        ],
    },
    {
        title: "Attendance",
        icon: CalendarCheck,
        href: "/SelfService/attendance",
    },
    {
        title: "Leave",
        icon: CalendarDays,
        href: "/SelfService/leave",
    },
    {
        title: "Loan & Financial",
        icon: HandCoins,
        href: "/SelfService/loan-financial",
    },
];


function SideberManu() {
    return (
        <SideAppBer menuItems={menuItems} className='top-16' ></SideAppBer>
    )
}

export default SideberManu
