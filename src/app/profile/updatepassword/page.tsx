import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import UpdatePasswordForm from "@/components/user/UpdatePasswordForm";
import { JSX } from "react";

const UpdatePasswordPage = ():JSX.Element => {
    return (

        <>
            <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <UpdatePasswordForm />
                </main>
            </div>
      </>
    )
}

export default UpdatePasswordPage;