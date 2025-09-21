"use client"
import PageHeader from "@/components/shared/PageHeader";
import { Category, Metadata } from "@/schema/entity";
import {  Button, 
        Select, 
        Table, 
        TableBody, 
        TableCell, 
        TableHead, 
        TableHeadCell, 
        TableRow, 
        TextInput
} from "flowbite-react";
import { JSX, useState } from "react";
import { HiChevronDoubleRight, 
        HiChevronDoubleLeft, 
        HiSearch,
        HiTrash,
        HiOutlinePlus,
        HiPencilAlt} from "react-icons/hi";

import { useRouter } from 'next/navigation'; 
import Link from "next/link";

interface CategoriesListProps {
    categories: Category[],
    metadata: Metadata
}        

const CategoryList = ({ categories, metadata } : CategoriesListProps):JSX.Element => {

    const [name, setName] = useState("")
    const [status, setStatus] = useState("active")
    const router = useRouter();

    const runFilter = () => {

        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'isActive': status,
            'page': "1"
        });

        const filterEndpoint = `/category?${params.toString()}`;
        router.push(filterEndpoint);
        
    }

    const clearFilter = () => {
        
        setName("");
        setStatus("active");

        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'isActive': status,
            'page': "1"
        });

        const filterEndpoint = `/category?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const runNextPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'isActive': status,
            'page': `${metadata.page+1}`
        });

        const filterEndpoint = `/category?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const runPreviousPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'isActive': status,
            'page': `${metadata.page-1}`
        });

        const filterEndpoint = `/category?${params.toString()}`;
        router.push(filterEndpoint);
    }

    return (
        <>
            <PageHeader
                title="Categories"
                subtitle="Manage category data"
            />
            <Button color={"light"} as={Link} href={`/category/create`} className="my-5" size="md"><HiOutlinePlus className="mr-3"/> Add New Category</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>No</TableHeadCell>
                        <TableHeadCell>Category Name</TableHeadCell>
                        <TableHeadCell>Status</TableHeadCell>
                        <TableHeadCell>Action</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <TextInput 
                                id="name"
                                type="text" 
                                sizing="md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                             />
                        </TableCell>
                        <TableCell>
                            <Select id="status" 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)}
                                required>
                                <option value={"active"}>Active</option>
                                <option value={"inactive"}>Inactive</option>
                            </Select>
                        </TableCell>
                        <TableCell className="flex space-x-0.5">
                            <Button color={"dark"} onClick={runFilter}><HiSearch /></Button>
                            <Button color={"dark"} onClick={clearFilter}><HiTrash /></Button>
                        </TableCell>
                    </TableRow>
                    {categories.map((category: Category, index: number) => (
                        <TableRow key={category.id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell className={category.isActive ? `bg-green-100 text-green-800 font-medium`: `bg-gray-100 text-gray-800 font-medium`}>
                                    {category.isActive ? 'Active' : 'Inactive'}
                                </TableCell>
                                <TableCell><Button color={"light"} size="sm" as={Link} href={`/category/${category.id}`}><HiPencilAlt className="mr-3" /> View Data</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex my-5 space-x-1">
                {metadata.page > 1 && (
                    <Button color="dark" onClick={runPreviousPage}>
                        <HiChevronDoubleLeft />
                    </Button>
                )}
                <p className="text-3xl font-semibold">{metadata.page} / {metadata.totalPage} </p>
                {metadata.page < metadata.totalPage && (
                    <Button color="dark" onClick={runNextPage}>
                        <HiChevronDoubleRight />
                    </Button>
                )}
            </div>
        </>
    )

}

export default CategoryList;