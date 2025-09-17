"use client"
import { Category, Product } from "@/schema/entity";
import { FormEvent, JSX, useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Button, FileInput, Label, ModalBody, ModalHeader, Select, Textarea, TextInput } from "flowbite-react";
import { formatDate } from "@/util/dayUtil";
import { Modal } from "flowbite-react";
import { HiOutlineSave, HiOutlineSelector, HiSearch, HiTrash, HiXCircle } from "react-icons/hi";
import { GetCategoryListResponse } from "@/schema/response";
import { toast } from "react-toastify";

interface ProductDetailProps {
    product: Product
}

const ProductDetail = ({ product }: ProductDetailProps):JSX.Element => {
    
    const [productName, setProductName] = useState(product.name)
    const [productDescription, setProductDescription] = useState(product.description)
    const [categoryId, setCategoryId] = useState(product.category.id);
    const [categoryName, setCategoryName] = useState(product.category.name);
    const [stock, setStock] = useState(product.stock);
    const [price, setPrice] = useState(product.price);
    const [status, setStatus] = useState(product.isActive);

    const [openSearchCategoryModal, setOpenSearchCategoryModal] = useState(false);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [searchCategoriesResult, setSearchCategoriesResult] = useState<Category[]>([]);

    const [selectedNewProductPicture, setSelectedNewProductPicture] = useState<File | null>(null);
    const [previewNewroductPictureUrl, setPreviewNewProductPictureUrl] = useState<string | null>(null);

    const handleProductPictureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedNewProductPicture(file);
            const url = URL.createObjectURL(file);
            setPreviewNewProductPictureUrl(url);
        } 
    };
    
    const clearSelection = () => {
        if (previewNewroductPictureUrl) {
            URL.revokeObjectURL(previewNewroductPictureUrl);
        }
        setSelectedNewProductPicture(null);
        setPreviewNewProductPictureUrl(null);
    };
    
    // Use Effect for the page
    useEffect(() => {
        return () => {
            if (previewNewroductPictureUrl) {
                URL.revokeObjectURL(previewNewroductPictureUrl);
            }
        };
    }, [previewNewroductPictureUrl]);

    const handleSubmitForm = async (e: FormEvent) => {

        e.preventDefault();


        let selectedImageUrl: string = product.imageUrl;

        if (selectedNewProductPicture) {
            
            const formData = new FormData();
            formData.append('file', selectedNewProductPicture);
            
            const response = await fetch('/api/service/product/uploadpicture', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                toast.error("Error when uploading image");
                return;
            }

            const responseUpload = await response.json();
            selectedImageUrl = responseUpload.data.url;
        }

        const requestBody: object = {
            id: product.id,
            name: productName,
            description: productDescription,
            price: price,
            stock: stock,
            isActive: status,
            imageUrl: selectedImageUrl,
            categoryId: categoryId
        }

        try {

            const res = await fetch('/api/service/product/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (!res.ok) {
               toast.error(data.responseMessage || "Update failed");
               return;
            }

            toast.success("Success update")
            window.location.href = `/product/${product.id}`;

        } catch (error: any) {
            toast.error("Network error")
        }
        
    }

    const handleDelete = async () => {

        const isConfirmed = window.confirm("Are you sure you want to delete this product? This action cannot be undone.");
    
        if (!isConfirmed) {
            return; // Exit if user cancels
        }

        const requestBody: object = {
            id: product.id,
        }

        try {

            const res = await fetch('/api/service/product/delete', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();
            
            if (!res.ok) {
                toast.error(data.responseMessage || "Update failed");
                return;
            }

            toast.success("Success update");
            window.location.href = "/product";

        } catch (error: any) {
            toast.error("Network error")
            return;
        }

    }

    const handleSearchCategory = async () => {

        const params: URLSearchParams = new URLSearchParams({
            'name': categoryQuery,
        })

        try {

            const res = await fetch(`/api/service/category/search/nopaginate?${params.toString()}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
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
    
    return (
        <>
            <PageHeader title="Product Data" subtitle={`Designated ID : ${product.id}`} />
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
                        > Change </Button>
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
                    {/* Current Image Preview */}
                    {product.imageUrl  && (
                        <>
                            <div className="mb-2 block">
                                <Label htmlFor="currentPicture">Current Picture</Label>
                            </div>
                            <div className="mt-3">
                                <img 
                                    id="currentPicture"
                                    src={product.imageUrl} 
                                    alt="currentPicture"
                                    className="max-w-full max-h-64 object-contain rounded border"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="uploadNewProductPicture">New Product Picture</Label>
                    </div>
                    <FileInput
                        id="uploadNewProductPicture"
                        onChange={(e) => handleProductPictureFileChange(e)}
                        accept=".png,.jpg,.jpeg"
                    />
                </div>

                <div>
                    {/* Image Preview */}
                    {selectedNewProductPicture && selectedNewProductPicture.type.startsWith('image/') && previewNewroductPictureUrl && (
                        <>
                            <div className="mt-3">
                                <img
                                    src={previewNewroductPictureUrl}
                                    alt="Preview"
                                    className="max-w-full max-h-64 object-contain rounded border"
                                />
                            </div>
                            <Button onClick={clearSelection} color={"yellow"} size="sm" className="my-5"><HiXCircle className="mr-3" /> Remove Uploaded Picture</Button>
                        </>
                    )}
                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lastUpdateAt">Last Updated At</Label>
                        </div>
                        <TextInput id="lastUpdateAt" 
                            type="text" value={formatDate(product.updatedAt)} disabled/>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lastUpdatedBy">Last Updated By</Label>
                        </div>
                        <TextInput id="lastUpdatedBy" type="text" value={product.updatedBy} disabled/>
                    </div>
                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="createdAt">Created At</Label>
                        </div>
                        <TextInput id="createdAt" 
                            type="text" value={formatDate(product.createdAt)} disabled/>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="createdBy">Created By</Label>
                        </div>
                        <TextInput id="createdBy" type="text" value={product.updatedBy} disabled/>
                    </div>
                </div>

                <div className="flex space-x-5">
                    <Button type="submit"><HiOutlineSave className="mr-3" />Save Product</Button>
                    <Button color={"red"} type="submit" onClick={(e) => handleDelete()}><HiTrash className="mr-3" />Delete Product</Button>
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

export default ProductDetail;