import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import UserDetail from "@/components/user/UserDetail";
import { RestConfiguration } from "@/schema/entity";
import { GetProfileDetailResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { JSX } from "react";
import { HiLockClosed } from "react-icons/hi";

const getProfileDetail = async (): Promise<GetProfileDetailResponse> => {

  const restConfiguration: RestConfiguration = await getHTTPPropsWithToken();
  const endpoint:string = `${restConfiguration.apiCmsHost}/api/auth/me`;

  let headers: object = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
  }

  const agent: AxiosInstance = axios.create({
      baseURL: endpoint,
      headers: headers
  })

  let response: AxiosResponse<GetProfileDetailResponse> = await agent.get(endpoint);

  return response.data;

} 

const ProfileDetailPage = async ():Promise<JSX.Element> => {

    const { data } = await getProfileDetail()
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
                    <Button as={Link} color={"light"}  className="my-5 max-w-xl" href={`/profile/updatepassword`}> <HiLockClosed /> Update Password </Button>
                </main>
            </div>
      </>
    )
}

export default ProfileDetailPage;