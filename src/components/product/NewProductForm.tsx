"use client"
import { Category } from "@/schema/entity";
import { FormEvent, JSX, useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Button, Label, ModalBody, ModalHeader, Select, Textarea, TextInput } from "flowbite-react";
import { Modal } from "flowbite-react";
import { HiOutlineSave, HiOutlineSelector, HiSearch, HiX, HiXCircle } from "react-icons/hi";
import { GetCategoryListResponse } from "@/schema/response";
import { FileInput } from "flowbite-react";
import { toast } from "react-toastify";

const NewProductForm = ():JSX.Element => {
    
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(true);
    
    const [openSearchCategoryModal, setOpenSearchCategoryModal] = useState(false);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [searchCategoriesResult, setSearchCategoriesResult] = useState<Category[]>([]);

    const [selectedProductPicture, setSelectedProductPicture] = useState<File | null>(null);
    const [previewProductPictureUrl, setPreviewProductPictureUrl] = useState<string | null>(null);

    const handleSubmitForm = async (e: FormEvent) => {

        e.preventDefault();


        let uploadPicture: string = "https://placehold.co/600x400";

        if (selectedProductPicture) {
            
            const formData = new FormData();
            formData.append('file', selectedProductPicture);
            
            const response = await fetch('/api/service/product/uploadpicture', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                toast.error("Error when uploading image");
                return;
            }

            const responseUpload = await response.json();
            uploadPicture =  responseUpload.data.url;
        }

        const requestBody: object = {
            name: productName,
            description: productDescription,
            price: price,
            stock: stock,
            isActive: status,
            categoryId: categoryId,
            imageUrl: uploadPicture
        }
        
        try {
            
            const res = await fetch('/api/service/product/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.responseMessage || "Create failed");
                return;
            }

            toast.success("Success create");

            window.location.href = "/product";

        } catch (error: any) {
            toast.error("Network error");
        }
        
    }

    const handleSearchCategory = async () => {

        const params: URLSearchParams = new URLSearchParams({
            'name': categoryQuery,
        })

        try {

            const res = await fetch(`/api/service/category/search/nopaginate?${params.toString()}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            });

            const response: GetCategoryListResponse = await res.json();

            if (!res.ok) {
                toast.error("Search failed");
                return;
            }

            setSearchCategoriesResult(response.data.categories);
            
        } catch (error: any) {
            toast.error("Network error");
            return
        }

    }

    const handleChooseCategory = (category: Category) => {
        setCategoryId(category.id);
        setCategoryName(category.name);
        setSearchCategoriesResult([]);
        setCategoryQuery("");
        setOpenSearchCategoryModal(false);
    }

    const handleProductPictureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0];
        if (file) {
            setSelectedProductPicture(file);
            const url = URL.createObjectURL(file);
            setPreviewProductPictureUrl(url);
        } 
    };

    const clearSelection = () => {
        if (previewProductPictureUrl) {
            URL.revokeObjectURL(previewProductPictureUrl);
        }
        setSelectedProductPicture(null);
        setPreviewProductPictureUrl(null);
    };

    // Use Effect for the page
    useEffect(() => {
        return () => {
            if (previewProductPictureUrl) {
                URL.revokeObjectURL(previewProductPictureUrl);
            }
        };
    }, [previewProductPictureUrl]);
    
    return (
        <>
            <PageHeader title="Product Data" subtitle={`Create new product`} />
            <form className="flex max-w-xl flex-col gap-4" onSubmit={(e) => handleSubmitForm(e)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="productName">Product Name</Label>
                    </div>
                    <TextInput 
                        id="productName" 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="categoryName">Category</Label>
                    </div>
                    <div className="flex">
                        <TextInput 
                            id="categoryName" 
                            type="text" 
                            value={categoryName}
                            readOnly
                            className="flex-grow"
                        />
                        <Button 
                            onClick={(e) => setOpenSearchCategoryModal(true)}
                            className="flex-shrink-0 ml-2 px-3 py-2 text-sm"    
                        > Choose </Button>
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="productDescription">Product Description</Label>
                    </div>
                    <Textarea 
                        id="productDescription" 
                        value={productDescription}
                        onChange={(e)=> setProductDescription(e.target.value)} />
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
                            <Label htmlFor="stock">Stock</Label>
                        </div>
                        <TextInput id="stock" 
                            type="number" 
                            value={stock} 
                            onChange={(e) => setStock(Number(e.target.value))}
                            />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="price">Price</Label>
                        </div>
                        <TextInput 
                            id="price" 
                            type="number" 
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="uploadProductPicture">Product Picture</Label>
                    </div>
                    <FileInput 
                        id="uploadProductPicture"
                        onChange={(e) => handleProductPictureFileChange(e)}
                        accept=".png,.jpg,.jpeg"
                    />
                </div>

                <div>
                    {/* Image Preview */}
                    {selectedProductPicture && selectedProductPicture.type.startsWith('image/') && previewProductPictureUrl && (
                        <>
                            <div className="mt-3">
                                <img 
                                    src={previewProductPictureUrl} 
                                    alt="Preview"
                                    className="max-w-full max-h-64 object-contain rounded border"
                                />
                            </div>
                            <Button onClick={clearSelection} color={"yellow"} size="sm" className="my-5"><HiXCircle className="mr-3"/> Remove Uploaded Picture</Button>
                        </>
                    )}
                </div>

                <div className="flex space-x-5">
                    <Button type="submit"><HiOutlineSave className="mr-3"/>Save Product</Button>
                </div>
            </form>

            {/* Modal forChoosing category */}
            <Modal show={openSearchCategoryModal} onClose={() => setOpenSearchCategoryModal(false)}>
                <ModalHeader>Choose Category</ModalHeader>
                <ModalBody>
                    <div className="flex">
                        <TextInput id="categoryQuery" type="text"
                            placeholder="Category Name"
                            value={categoryQuery} 
                            onChange={(e) => setCategoryQuery(e.target.value)}
                            className="flex-grow"
                        />
                        <Button 
                            className="flex-shrink-0 ml-2 px-3 py-2 text-sm"
                            onClick={() => handleSearchCategory()}   
                        > 
                            <HiSearch />
                        </Button>    
                    </div>
                    <div className="my-5 overflow-y-auto max-h-96 rounded-2xl p-4 border-solid border-2 border-black">
                        {searchCategoriesResult.map((category: Category) => (
                            <div className="border-1 border-solid border-gray-800 rounded-2xl p-3 my-5" key={category.id}>
                                <div className="flex justify-between">
                                    <p className="text font-extralight">{category.name}</p>
                                    <Button color={"default"} size="md" onClick={() => handleChooseCategory(category)}><HiOutlineSelector/></Button>     
                                </div>
                            </div>
                        ))}
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default NewProductForm;