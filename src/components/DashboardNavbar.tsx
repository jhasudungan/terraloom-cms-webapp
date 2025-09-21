"use client";
import axios from "axios";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { JSX } from "react";
import { toast } from "react-toastify";

const DashboardNavbar = (): JSX.Element => {

  const handleLogout = async () => {
    try {
      await axios.get("/api/service/auth/logout"); // Calls your logoutService
      window.location.href = "/" // Redirect to login page
    } catch (error: unknown) {
      console.error(error);
      toast.error("Logout failed");
      return
    }
  };

  return (
    <>
      <Navbar fluid rounded>
        <NavbarBrand href="#">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Terraloom Admin</span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/profile">
            Profile
          </NavbarLink>
          <NavbarLink onClick={() => handleLogout()}>
            Logout
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </>
  )
}

export default DashboardNavbar