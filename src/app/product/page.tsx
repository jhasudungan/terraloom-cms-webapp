import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProductList from "@/components/product/ProductList";
import { ProductSearchParams, RestConfiguration } from "@/schema/entity";
import { GetProductListResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

interface ProductListPageProps {
    searchParams: Promise<ProductSearchParams>
}

const getProducts = async(searchParams : ProductSearchParams): Promise<GetProductListResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken();

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
        'categoryId': '',
        'categoryName': searchParams.categoryName || "",
        'isActive': isActive
    });

    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/products?${params.toString()}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetProductListResponse> = await agent.get(endpoint);

    return response.data;

}

const ProductListPage = async ({ searchParams }: ProductListPageProps):Promise<JSX.Element> => {

    const resolvedSearchParams: ProductSearchParams = await searchParams;
    const getProductListResponse: GetProductListResponse = await getProducts(resolvedSearchParams);
    const { products, metadata } = getProductListResponse.data;

    return (
        <>
            <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <ProductList products={products} metadata={metadata}/>
                </main>
            </div>
        </>
    )
}

export default ProductListPage;