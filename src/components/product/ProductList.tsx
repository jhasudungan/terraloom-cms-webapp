"use client";
import { JSX, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Badge, Button, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlinePlus, HiPencilAlt, HiSearch, HiTrash } from "react-icons/hi";
import { Metadata, Product } from "@/schema/entity";
import { useRouter } from 'next/navigation'; 
import Link from "next/link";

interface ProductsListProps {
    products: Product[],
    metadata: Metadata
}     

const ProductList = ({ products, metadata }: ProductsListProps):JSX.Element => {
    
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [status, setStatus] = useState("active")
    const router = useRouter();

    const runFilter = () => {

        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'categoryName': category,
            'isActive': status,
            'page': "1"
        });

        const filterEndpoint = `/product?${params.toString()}`;
        router.push(filterEndpoint);
        
    }

    const clearFilter = () => {
        
        setName("");
        setCategory("");
        setStatus("active");

        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'isActive': status,
            'page': "1"
        });

        const filterEndpoint = `/product?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const runNextPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'categoryName': category,
            'isActive': status,
            'page': `${metadata.page+1}`
        });

        const filterEndpoint = `/product?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const runPreviousPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'name': name,
            'categoryName': category,
            'isActive': status,
            'page': `${metadata.page-1}`
        });

        const filterEndpoint = `/product?${params.toString()}`;
        router.push(filterEndpoint);
    }

    return (
        <>
            <PageHeader
                title="Products"
                subtitle="Manage product data"
            />
            <Button color={"light"} as={Link} href={`/product/create`} className="my-5" size="md"><HiOutlinePlus className="mr-3" /> Add New Product</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>No</TableHeadCell>
                        <TableHeadCell>Product Name</TableHeadCell>
                        <TableHeadCell>Category</TableHeadCell>
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
                            <TextInput 
                                id="name"
                                type="text" 
                                sizing="md"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                    {products.map((product: Product, index: number) => (
                        <TableRow key={product.id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell className={product.isActive ? `bg-green-100 text-green-800 font-medium`: `bg-gray-100 text-gray-800 font-medium`}>
                                    {product.isActive ? 'Active' : 'Inactive'}
                                </TableCell>
                                <TableCell><Button color={"light"} size="sm" as={Link} href={`/product/${product.id}`}><HiPencilAlt className="mr-3" /> View Data</Button></TableCell>
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

export default ProductList;