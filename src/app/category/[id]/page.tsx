import CategoryDetail from "@/components/category/CategoryDetail";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { RestConfiguration } from "@/schema/entity";
import { GetCategoryDetailResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

type CategoryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getCategoryDetail = async (id: string): Promise<GetCategoryDetailResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken();
    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/category/${id}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    let response: AxiosResponse<GetCategoryDetailResponse> = await agent.get(endpoint);

    return response.data;

} 

const CategoryDetailPage = async ({ params }: CategoryDetailPageProps):Promise<JSX.Element> => {

    const resolvedParams = await params
    const { data } = await getCategoryDetail(resolvedParams.id)
    const { category } = data;

    return (
      <>
        <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <CategoryDetail category={category} />
                </main>
            </div>
      </>
    )
}

export default CategoryDetailPage;