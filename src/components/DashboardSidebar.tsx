"use client"
import { JSX } from "react";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiCube, HiCurrencyDollar, HiOutlineDesktopComputer, HiOutlineTag, HiUser, HiUsers } from "react-icons/hi";
import Link from "next/link";

const DashboardSidebar = ():JSX.Element => {

    return (
        <>
            <Sidebar aria-label="Default sidebar example">
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="/dashboard" icon={HiOutlineDesktopComputer}>
                            Dashboard
                        </SidebarItem>
                        <SidebarItem href="/user" icon={HiUser}>
                            User
                        </SidebarItem>
                        <SidebarItem href="/category" as={Link} icon={HiOutlineTag}>
                            Category
                        </SidebarItem>
                        <SidebarItem href="/product" icon={HiCube}>
                            Product
                        </SidebarItem>
                        <SidebarItem href="/account" icon={HiUsers}>
                            Account
                        </SidebarItem>
                        <SidebarItem href="/order" icon={HiCurrencyDollar}>
                            Order
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </>
    )
}

export default DashboardSidebar;