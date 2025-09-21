import AccountList from "@/components/account/AccountList";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { AccountSearchParams, RestConfiguration } from "@/schema/entity";
import { GetAccountListResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

interface AccountListPageProps {
    searchParams: Promise<AccountSearchParams>
}

const getAccountList = async(searchParams : AccountSearchParams): Promise<GetAccountListResponse> => {

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

    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/accounts?${params.toString()}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetAccountListResponse> = await agent.get(endpoint);

    return response.data;

}

const UserListPage = async ({ searchParams }: AccountListPageProps):Promise<JSX.Element> => {
    
    const resolvedSearchParams: AccountSearchParams = await searchParams;
    const getAccountListResponse: GetAccountListResponse = await getAccountList(resolvedSearchParams);
    const { accounts, metadata } = getAccountListResponse.data;
    
    return (
        <>
            <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                   <AccountList accounts={accounts} metadata={metadata} />
                </main>
            </div>
        </>
    ) 
    
    

}

export default UserListPage;