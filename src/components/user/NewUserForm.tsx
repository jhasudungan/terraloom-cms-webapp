"use client"
import { FormEvent, JSX, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Button, Label, TextInput } from "flowbite-react";
import { HiOutlineSave } from "react-icons/hi";
import { toast } from "react-toastify";

const NewUserForm = ():JSX.Element => {

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmitForm = async (e: FormEvent) => {

        e.preventDefault();

        const requestBody: object = {
            username: username,
            displayName: displayName,
            email: email,
            isActive: true,
            password: password
        }

        try {

            const res = await fetch('/api/service/user/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();
            
            if (!res.ok) {
                toast.error(data.responseMessage || "Create failed");
                return;
            }

            toast.success("Success create");
            window.location.href = "/user";

        } catch (error : any) {
            toast.error("Network error");
            return;
        }
    
        
    }

    return (
        <>
            <PageHeader title="Create User Data" />
            <form className="flex max-w-xl flex-col gap-4" onSubmit={(e) => handleSubmitForm(e)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username">Username</Label>
                    </div>
                    <TextInput 
                        id="username" 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <TextInput 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="displayName">Display Name</Label>
                    </div>
                    <TextInput 
                        id="displayName" 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password">Assigned Password</Label>
                    </div>
                    <TextInput 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <div>
                    <Button type="submit"><HiOutlineSave className="mr-3"/> Save User</Button>
                </div>
            </form>
        </>
    )
}

export default NewUserForm;