"use client"
import { User } from "@/schema/entity";
import { FormEvent, JSX, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { formatDate } from "@/util/dayUtil";
import { HiOutlineSave, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";

interface UserDetailProps {
    user: User
}

const UserDetail = ({ user }: UserDetailProps):JSX.Element => {
    
    const [displayName, setDisplayName] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);
    const [status, setStatus] = useState(user.isActive);

    const handleSubmitForm = async (e: FormEvent) => {

        e.preventDefault();

        const requestBody: object = {
            id: user.id,
            username: user.username,
            displayName: displayName,
            email: email,
            isActive: status
        }

        try {

            const res = await fetch('/api/service/user/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.responseMessage || "Update failed");
                return;
            }

            toast.success("Success update");
            window.location.href = `/user/${user.id}`;

        } catch (error: any) {
            toast.error("Network error");
            return;
        }
        
    }

    return (
        <>
            <PageHeader title="User Data" subtitle={`Designated ID : ${user.id}`} />
            <form className="flex max-w-xl flex-col gap-4" onSubmit={(e) => handleSubmitForm(e)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username">Username</Label>
                    </div>
                    <TextInput 
                        id="username" 
                        type="text" 
                        value={user.username}
                        readOnly
                        disabled    
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="displayName">Role</Label>
                    </div>
                    <TextInput 
                        id="displayName" 
                        type="text" 
                        value={user.role}
                        readOnly
                        disabled
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
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <TextInput 
                        id="email" 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {user.role === "ROLE_ADM" && (
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="status">Status (Only available for Admin)</Label>
                        </div>
                        <Select
                            id="status"
                            value={status ? "true" : "false"}
                            onChange={(e) => setStatus(e.target.value === "true")}
                            required
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </Select>
                    </div>
                )}
                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lastUpdateAt">Last Updated At</Label>
                        </div>
                        <TextInput id="lastUpdateAt" 
                            type="text" value={formatDate(user.updatedAt)} disabled/>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lastUpdatedBy">Last Updated By</Label>
                        </div>
                        <TextInput id="lastUpdatedBy" type="text" value={user.updatedBy} disabled/>
                    </div>
                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="createdAt">Created At</Label>
                        </div>
                        <TextInput id="createdAt" 
                            type="text" value={formatDate(user.createdAt)} disabled/>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="createdBy">Created By</Label>
                        </div>
                        <TextInput id="createdBy" type="text" value={user.updatedBy} disabled/>
                    </div>
                </div>

                <div className="flex space-x-5">
                    <Button type="submit" className="flex-1"><HiOutlineSave className="mr-3"/> Save User</Button>
                </div>
            </form>
        </>
    )
}

export default UserDetail;