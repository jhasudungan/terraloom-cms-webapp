"use client";
import { JSX, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Badge, Button, Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlinePlus, HiPencilAlt, HiSearch, HiTrash } from "react-icons/hi";
import { Metadata, Order } from "@/schema/entity";
import { useRouter } from 'next/navigation'; 
import Link from "next/link";
import { formatNumber } from "@/util/numberUtil";

interface OrderListProps {
    orders: Order[],
    metadata: Metadata
}     

const OrderList = ({ orders, metadata }: OrderListProps):JSX.Element => {
    
    const [orderReference, setOrderReference] = useState("")
    const router = useRouter();

    const runFilter = () => {

        const params: URLSearchParams = new URLSearchParams({
            'orderReference': orderReference,
            'page': "1"
        });

        const filterEndpoint = `/order?${params.toString()}`;
        router.push(filterEndpoint);
        
    }

    const clearFilter = () => {
        
        setOrderReference("");

        const params: URLSearchParams = new URLSearchParams({
            'orderReference': orderReference,
            'page': "1"
        });

        const filterEndpoint = `/order?${params.toString()}`;
        router.push(filterEndpoint);

    }

    const runNextPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'orderReference': orderReference,
            'page': `${metadata.page+1}`
        });

        const filterEndpoint = `/order?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const runPreviousPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'orderReference': orderReference,
            'page': `${metadata.page-1}`
        });

        const filterEndpoint = `/order?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const statusCellStyles: Record<string, string> = {
        "PENDING PAYMENT": "bg-yellow-100 text-yellow-800 font-medium",
        "PAYMENT RECEIVED": "bg-indigo-100 text-indigo-800 font-medium",
        "PROCESSED": "bg-blue-100 text-blue-800 font-medium",
        "FINISHED": "bg-green-100 text-green-800 font-medium",
        "CANCELLED": "bg-red-100 text-red-800 font-medium"
    };

    return (
        <>
            <PageHeader
                title="Orders"
                subtitle="See order data"
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>No</TableHeadCell>
                        <TableHeadCell>Order Reference</TableHeadCell>
                        <TableHeadCell>Payment Reference</TableHeadCell>
                        <TableHeadCell>Total Order</TableHeadCell>
                        <TableHeadCell>Order Status</TableHeadCell>
                        <TableHeadCell>Action</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <TextInput 
                                id="orderReference"
                                type="text" 
                                sizing="md"
                                value={orderReference}
                                onChange={(e) => setOrderReference(e.target.value)}
                             />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="flex space-x-0.5">
                            <Button color={"dark"} onClick={runFilter}><HiSearch /></Button>
                            <Button color={"dark"} onClick={clearFilter}><HiTrash /></Button>
                        </TableCell>
                    </TableRow>
                    {orders.map((order: Order, index: number) => (
                        <TableRow key={order.orderReference}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{order.orderReference}</TableCell>
                                <TableCell>{order.payment.paymentReference}</TableCell>
                                <TableCell>Rp. {formatNumber(order.total)}</TableCell>
                                <TableCell className={statusCellStyles[order.status] || ""}>
                                    {order.status}
                                </TableCell>  
                                <TableCell><Button color={"light"} size="sm" as={Link} href={`/order/${order.orderReference}`}><HiPencilAlt className="mr-3" /> View Data</Button></TableCell>
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

export default OrderList;