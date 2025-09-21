"use client"
import { Category } from "@/schema/entity";
import { FormEvent, JSX, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { formatDate } from "@/util/dayUtil";
import { HiOutlineSave, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";

interface CategoryDetailProps {
    category: Category
}

const CategoryDetail = ({ category }: CategoryDetailProps):JSX.Element => {
    
    const [categoryName, setCategoryName] = useState(category.name)
    const [categoryDescription, setCategoryDescription] = useState(category.description)
    const [status, setStatus] = useState(category.isActive)

    const handleSubmitForm = async (e: FormEvent) => {

        e.preventDefault();

        const requestBody: object = {
            id: category.id,
            name: categoryName,
            description: categoryDescription,
            isActive: status
        }
        
        try {

            const res = await fetch('/api/service/category/update', {
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
            window.location.href = `/category/${category.id}`;

        } catch (error : unknown) {
            console.error(error);
            toast.error("Network error");
        }
        
    }

    const handleDelete = async () => {

        const isConfirmed = window.confirm("Are you sure you want to delete this category? This action cannot be undone.");
    
        if (!isConfirmed) {
            return; // Exit if user cancels
        }

        const requestBody: object = {
            id: category.id,
        }

        try {

            const res = await fetch('/api/service/category/delete', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.responseMessage || "Delete failed");
                return;
            }

            toast.success("Success delete");

            window.location.href = "/category";
        } catch(error: unknown) {
            console.error(error);
            toast.error("Network error");
        }
        
    }
    
    return (
        <>
            <PageHeader title="Category Data" subtitle={`Designated ID : ${category.id}`} />
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
                    <div className="mb-2 block">
                        <Label htmlFor="status">Status</Label>
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

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lastUpdateAt">Last Updated At</Label>
                        </div>
                        <TextInput id="lastUpdateAt" 
                            type="text" value={formatDate(category.updatedAt)} disabled/>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lastUpdatedBy">Last Updated By</Label>
                        </div>
                        <TextInput id="lastUpdatedBy" type="text" value={category.updatedBy} disabled/>
                    </div>
                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="createdAt">Created At</Label>
                        </div>
                        <TextInput id="createdAt" 
                            type="text" value={formatDate(category.createdAt)} disabled/>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="createdBy">Created By</Label>
                        </div>
                        <TextInput id="createdBy" type="text" value={category.updatedBy} disabled/>
                    </div>
                </div>

                <div className="flex space-x-5">
                    <Button type="submit"><HiOutlineSave className="mr-3"/> Save Category</Button>
                    <Button color={"red"} type="submit" onClick={() => handleDelete()}><HiTrash className="mr-3"/> Delete Category</Button>
                </div>
            </form>
        </>
    )
}

export default CategoryDetail;