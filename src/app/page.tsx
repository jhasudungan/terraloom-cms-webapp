import LoginForm from "@/components/login/LoginForm";
import { Button } from "flowbite-react";
import { JSX } from "react";

const Home = ():JSX.Element => {
  
  return (
    <>
        {/* flex to make the sidebar and main sit next to each oter */}
        <div className="flex min-h-screen">
            {/* flex-1 told the the main to take everyspace left after sidebar */}
            <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                <LoginForm />
            </main>
        </div>
    </>
  );
  
}

export default Home;