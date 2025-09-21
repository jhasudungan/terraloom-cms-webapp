import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import UserDetail from "@/components/user/UserDetail";
import { RestConfiguration } from "@/schema/entity";
import { GetUserDetailResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

type UserDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getUserDetail = async (id: string): Promise<GetUserDetailResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken();
    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/user/${id}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetUserDetailResponse> = await agent.get(endpoint);

    return response.data;

} 

const UserDetailPage = async ({ params }: UserDetailPageProps):Promise<JSX.Element> => {

    const resolvedParams = await params
    const { data } = await getUserDetail(resolvedParams.id)
    const { user } = data;

    return (
      <>
        <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <UserDetail user={user} />
                </main>
            </div>
      </>
    )
}

export default UserDetailPage;