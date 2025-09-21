import AccountDetail from "@/components/account/AccountDetail";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { RestConfiguration } from "@/schema/entity";
import { GetAccountDetailResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

type AccountDetailPageProps = {
  params: Promise<{
    accountReference: string;
  }>;
};

const getAccountDetail = async (accountReference: string): Promise<GetAccountDetailResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken();
    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/account/${accountReference}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetAccountDetailResponse> = await agent.get(endpoint);

    return response.data;

} 

const AccountDetailPage = async ({ params }: AccountDetailPageProps):Promise<JSX.Element> => {

    const resolvedParams = await params
    const { data } = await getAccountDetail(resolvedParams.accountReference)
    const { account } = data;

    return (
      <>
        <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <AccountDetail account={account} />
                </main>
            </div>
      </>
    )
}

export default AccountDetailPage;