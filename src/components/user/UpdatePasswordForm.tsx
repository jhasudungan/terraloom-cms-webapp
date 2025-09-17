"use client"
import { FormEvent, JSX, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Button, Label, TextInput } from "flowbite-react";
import { HiOutlineSave } from "react-icons/hi";
import { toast } from "react-toastify";

const UpdatePasswordForm = ():JSX.Element => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmitForm = async (e: FormEvent) => {

        e.preventDefault();

        const requestBody: object = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        
        try {

            const res = await fetch('/api/service/user/updatePassword', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
            });

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.responseMessage || "Update failed");
                return;
            }

            toast.success("Update successfully!");
            window.location.href = "/profile";

        } catch (error: any) {
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
                        <Label htmlFor="oldPassword">Old Password</Label>
                    </div>
                    <TextInput 
                        id="oldPassword" 
                        type="password" 
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="newPassword">New Password</Label>
                    </div>
                    <TextInput 
                        id="newPassword" 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                
                <div>
                    <Button type="submit"><HiOutlineSave className="mr-3"/> Save New Password </Button>
                </div>
            </form>
        </>
    )
}

export default UpdatePasswordForm;