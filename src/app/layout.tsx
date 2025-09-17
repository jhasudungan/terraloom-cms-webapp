import type { Metadata } from "next";
import { JSX } from "react";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Terraloom",
  description: "For home not house",
};

interface LayoutProp {
  children: React.ReactNode
}

const RootLayout = ({ children }: LayoutProp): JSX.Element => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
