"use client"
import PageHeader from "@/components/shared/PageHeader";
import { Metadata, User } from "@/schema/entity";
import { Badge, Button, 
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

interface UserListProps {
    users: User[],
    metadata: Metadata
}        

const UserList = ({ users, metadata } : UserListProps):JSX.Element => {

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("active")
    const router = useRouter();

    const runFilter = () => {

        const params: URLSearchParams = new URLSearchParams({
            'username': username,
            'displayName': displayName,
            'email': email,
            'isActive': status,
            'page': "1"
        });

        const filterEndpoint = `/user?${params.toString()}`;
        router.push(filterEndpoint);
        
    }

    const clearFilter = () => {
        
        setUsername("");
        setDisplayName("");
        setEmail("");
        setStatus("active");

        const params: URLSearchParams = new URLSearchParams({
            'username': '',
            'displayName': '',
            'email': '',
            'isActive': status,
            'page': "1"
        });

        const filterEndpoint = `/user?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const runNextPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'username': username,
            'displayName': displayName,
            'email': email,
            'isActive': status,
            'page': `${metadata.page+1}`
        });

        const filterEndpoint = `/user?${params.toString()}`;
        router.push(filterEndpoint);
    }

    const runPreviousPage = () => {
        
        const params: URLSearchParams = new URLSearchParams({
            'username': username,
            'displayName': displayName,
            'email': email,
            'isActive': status,
            'page': `${metadata.page-1}`
        });

        const filterEndpoint = `/user?${params.toString()}`;
        router.push(filterEndpoint);
    }

    return (
        <>
            <PageHeader
                title="User"
                subtitle="Manage user data"
            />
            <Button color={"light"} as={Link} href={`/user/create`} className="my-5" size="md"><HiOutlinePlus className="mr-3" /> Add New User</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>No</TableHeadCell>
                        <TableHeadCell>Username</TableHeadCell>
                        <TableHeadCell>DisplayName</TableHeadCell>
                        <TableHeadCell>Email</TableHeadCell>
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                             />
                        </TableCell>
                        <TableCell>
                            <TextInput 
                                id="displayName"
                                type="text" 
                                sizing="md"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                             />
                        </TableCell>
                        <TableCell>
                            <TextInput 
                                id="email"
                                type="email" 
                                sizing="md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                    {users.map((user: User, index: number) => (
                        <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className={user.isActive ? `bg-green-100 text-green-800 font-medium`: `bg-gray-100 text-gray-800 font-medium`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </TableCell>
                                <TableCell><Button color={"light"} as={Link} href={`/user/${user.id}`} size="sm"><HiPencilAlt className="mr-3" /> View Data</Button></TableCell>
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

export default UserList;