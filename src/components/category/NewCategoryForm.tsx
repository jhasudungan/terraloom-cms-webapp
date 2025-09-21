"use client"
import { FormEvent, JSX, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Button, Label, TextInput } from "flowbite-react";
import { HiOutlineSave } from "react-icons/hi";
import { toast } from "react-toastify";

const NewCategoryForm = ():JSX.Element => {

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const handleSubmitForm = async (e: FormEvent) => {

        e.preventDefault();

        const requestBody: object = {
            name: categoryName,
            description: categoryDescription
        }
        
        try {

            const res = await fetch('/api/service/category/create', {
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

            window.location.href = "/category";

        } catch (error: unknown) {
            console.error(error);
            toast.error("Network error");
        }
    
    }

    return (
        <>
            <PageHeader title="Create Category Data" />
            <form className="flex max-w-xl flex-col gap-4" onSubmit={(e) => handleSubmitForm(e)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="categoryName">Category Name</Label>
                    </div>
                    <TextInput 
                        id="categoryName" 
                        type="text" 
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="categoryDescription">Category Description</Label>
                    </div>
                    <TextInput 
                        id="categoryDescription" 
                        type="text" 
                        value={categoryDescription}
                        onChange={(e)=> setCategoryDescription(e.target.value)} />
                </div>
                <div>
                    <Button type="submit"><HiOutlineSave className="mr-3"/> Save Category</Button>
                </div>
            </form>
        </>
    )
}

export default NewCategoryForm;