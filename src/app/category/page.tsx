import CategoryList from "@/components/category/CategoryList";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { CategorySearchParams, RestConfiguration } from "@/schema/entity";
import { GetCategoryListResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

interface CategoryListPageProps {
    searchParams: Promise<CategorySearchParams>
}

const getCategoryList = async(searchParams : CategorySearchParams): Promise<GetCategoryListResponse> => {

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
        'name': searchParams.name || "",
        'isActive': isActive
    });

    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/categories?${params.toString()}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetCategoryListResponse> = await agent.get(endpoint);

    return response.data;

}

const CategoryListPage = async ({ searchParams }: CategoryListPageProps):Promise<JSX.Element> => {
    
    const resolvedSearchParams: CategorySearchParams = await searchParams;
    const getCategoryListResponse: GetCategoryListResponse = await getCategoryList(resolvedSearchParams);
    const { categories, metadata } = getCategoryListResponse.data;
    
    return (
        <>
            <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <CategoryList categories={categories} metadata={metadata}/>
                </main>
            </div>
        </>
    ) 
    
    

}

export default CategoryListPage;