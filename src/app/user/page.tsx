import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import UserList from "@/components/user/UserList";
import { RestConfiguration, UsersSearchParams } from "@/schema/entity";
import { GetUserListResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

interface UserListPageProps {
    searchParams: Promise<UsersSearchParams>
}

const getUserList = async(searchParams : UsersSearchParams): Promise<GetUserListResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken()

    let isActive: string = "true";
    if (searchParams.isActive && searchParams.isActive === "inactive") {
        isActive = "false";
    }

    const params: URLSearchParams = new URLSearchParams({
        'isPaginate': "true",
        'perPage': restConfiguration.apiCMSDefaultPerpage,
        'page': searchParams.page || "1",
        'id': '',
        'displayName': searchParams.displayName || "",
        'username': searchParams.username || "",
        'email': searchParams.email || "",
        'isActive': isActive
    });

    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/users?${params.toString()}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetUserListResponse> = await agent.get(endpoint);

    return response.data;

}

const UserListPage = async ({ searchParams }: UserListPageProps):Promise<JSX.Element> => {
    
    const resolvedSearchParams: UsersSearchParams = await searchParams;
    const getUserListResponse: GetUserListResponse = await getUserList(resolvedSearchParams);
    const { users, metadata } = getUserListResponse.data;
    
    return (
        <>
            <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <UserList users={users} metadata={metadata} />
                </main>
            </div>
        </>
    ) 
    
    

}

export default UserListPage;