"use client"

import { OrderItem, OrderWithItems } from "@/schema/entity"
import { JSX, useState } from "react"
import PageHeader from "../shared/PageHeader"
import { Button, Label, Modal, ModalBody, ModalHeader, Select, TextInput } from "flowbite-react"
import { formatDate } from "@/util/dayUtil"
import { HiCheck, HiOutlineSave, HiX } from "react-icons/hi"
import { formatNumber } from "@/util/numberUtil"
import { toast } from "react-toastify"
import Link from "next/link"
import { HiBars4 } from "react-icons/hi2"

interface OrderDetailProps {
    order: OrderWithItems
}

const OrderDetail = ( { order  }: OrderDetailProps): JSX.Element => {

    const handleFinishOrder = async () => {
         
        const requestBody: object = {
            orderReference: order.orderReference,
            status: "FINISHED"
        }

        try {

            const res = await fetch('/api/service/order/update', {
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
            window.location.href = `/order/${order.orderReference}`;

        } catch (error: any) {
            toast.error("Network error")
        }

    }

    const handleCancelOrder = async () => {
         
        const requestBody: object = {
            orderReference: order.orderReference,
            status: "CANCELLED"
        }

        try {

            const res = await fetch('/api/service/order/update', {
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
            window.location.href = `/order/${order.orderReference}`;

        } catch (error: any) {
            toast.error("Network error")
        }

    }

    const handleProcessOrder = async () => {
         
        const requestBody: object = {
            orderReference: order.orderReference,
            status: "PROCESSED"
        }

        try {

            const res = await fetch('/api/service/order/update', {
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
            window.location.href = `/order/${order.orderReference}`;

        } catch (error: any) {
            toast.error("Network error")
        }

    }

    // Inside your component (for modal view image):
    const [selectedImageUrl, setSelectedImageUrl] = useState("");
    const [selectedImageName, setSelectedImageName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = (imageUrl: string, productName: string) => {
        setSelectedImageUrl(imageUrl);
        setSelectedImageName(productName);
        setIsModalOpen(true);
    };


    return (
        <>
            <PageHeader title="Order Data" subtitle={`Order Reference : ${order.orderReference}`} />
            <form className="flex max-w-xl flex-col gap-4">
                
                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="orderReference">Order Reference</Label>
                        </div>
                        <TextInput 
                            id="orderReference" 
                            type="text" 
                            value={order.orderReference}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="paymentReference">Payment Reference</Label>
                        </div>
                        <TextInput 
                            id="paymentReference" 
                            type="text" 
                            value={order.payment.paymentReference}
                            readOnly
                            disabled
                        />
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="orderDate">Order Date</Label>
                        </div>
                        <TextInput 
                            id="orderDate" 
                            type="text" 
                            value={formatDate(order.orderDate)}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="paymentDate">Payment Date</Label>
                        </div>
                        <TextInput 
                            id="paymentDate" 
                            type="text" 
                            value={formatDate(order.payment.paymentDate)}
                            readOnly
                            disabled
                        />
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="orderTotal">Total Order</Label>
                        </div>
                        <TextInput 
                            id="orderTotal" 
                            type="text" 
                            value={formatNumber(order.total)}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="paymentTotal">Total Payment</Label>
                        </div>
                        <TextInput 
                            id="paymentTotal" 
                            type="text" 
                            value={formatNumber(order.payment.total)}
                            readOnly
                            disabled
                        />
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="cardNumber">Card Number</Label>
                        </div>
                        <TextInput 
                            id="cardNumber" 
                            type="text" 
                            value={order.payment.cardNumber ? order.payment.cardNumber : "N/A"}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="cardHolderName">Card Holder Name</Label>
                        </div>
                        <TextInput 
                            id="cardHolderName" 
                            type="text" 
                            value={order.payment.cardHolderName ? order.payment.cardHolderName : "N/A"}
                            readOnly
                            disabled
                        />
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="orderStatus">Order Status</Label>
                        </div>
                        <TextInput 
                            id="orderStatus" 
                            type="text" 
                            value={order.status}
                            readOnly
                            disabled
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="paymentStatus">Payment Status</Label>
                        </div>
                        <TextInput 
                            id="paymentStatus" 
                            type="text" 
                            value={order.payment.status}
                            readOnly
                            disabled
                        />
                    </div>

                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-5 justify-between">
                     <div className="flex flex-col flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="deliveryAddress">Delivery Address</Label>
                        </div>
                        <TextInput 
                            id="deliveryAddress" 
                            type="text" 
                            value={order.deliveryAddress}
                            readOnly
                            disabled
                        />
                    </div>
                </div>

                

                <div className="mb-2 block">
                    <Label htmlFor="orderItems">Order Items</Label>
                    <p className="text-sm text-gray-500 mt-2">
                        All price , image and name as recorded during transaction
                    </p>   
                </div>
                <div className="overflow-y-auto max-h-96 ">
                    {order.orderItems.map((item: OrderItem) => (
                        <div className="border-1 border-solid border-gray-800 rounded-2xl p-3 my-5 flex gap-3" key={item.orderItemReference}>
                        
                        {/* Image on the left */}
                        <div className="flex-shrink-0">
                            <img 
                            src={item.product.imageUrl} 
                            alt={item.product ? item.product.name : "Product image"} 
                            className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => handleImageClick(item.product.imageUrl, item.product?.name)}
                        />
                        </div>
            
                        {/* Product info on the right */}
                        <div className="flex-1">
                            <Link href={`/product/${item.product.id}`} className="text font-medium hover:text-blue-600 transition-colors">
                                {item.product ? item.product.name : ""}
                            </Link>
                            <p className="text font-extralight">{item.quantity ? item.quantity : ""} X Rp. {item.quantity ? new Intl.NumberFormat('id-ID').format(item.priceSnapshot) : ""}</p>
                            <p className="text font-extralight">Rp {item.total ? new Intl.NumberFormat('id-ID').format(item.total) : "" }</p>
                        </div>

                    </div>
                    ))}
                </div>

                <div className="flex space-x-5">
                    <div className="flex gap-2">
                        {order.status === "PAYMENT RECEIVED" && <Button type="submit" color="green" onClick={() => handleProcessOrder()}>
                            <HiOutlineSave className="mr-3"  /> Process Order
                        </Button>}
                        {order.status === "PROCESSED" && <Button type="submit" color="default" onClick={() => handleFinishOrder()}>
                            <HiCheck className="mr-3"  /> Finish Order
                        </Button>}
                        {order.status === "PAYMENT PENDING" || order.status === "PAYMENT RECEIVED" &&  <Button type="submit" color="red" onClick={() => handleCancelOrder()}>
                            <HiX className="mr-3" /> Cancel Order
                        </Button>}
                    </div>
                </div>
            </form>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
                <ModalHeader>
                    {selectedImageName || "Product Image"}
                </ModalHeader>
                <ModalBody>
                    <div className="flex justify-center">
                        <img
                            src={selectedImageUrl}
                            alt={selectedImageName || "Product image"}
                            className="max-w-full max-h-96 object-contain"
                        />
                    </div>
                </ModalBody>
            </Modal>
        </>
    )

}

export default OrderDetail;