import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import OrderList from "@/components/order/OrderList";
import { OrderSearchParams, RestConfiguration } from "@/schema/entity";
import { GetOrderListResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

interface OrderListPageProps {
    searchParams: Promise<OrderSearchParams>
}

const getOrderList = async(searchParams : OrderSearchParams): Promise<GetOrderListResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken()

    const params: URLSearchParams = new URLSearchParams({
        'isPaginate': "true",
        'perPage': restConfiguration.apiCMSDefaultPerpage,
        'page': searchParams.page || "1",
        'id': '',
        'orderReference': searchParams.orderReference || "",
    });

    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/orders?${params.toString()}`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetOrderListResponse> = await agent.get(endpoint);

    return response.data;

}

const CategoryListPage = async ({ searchParams }: OrderListPageProps):Promise<JSX.Element> => {
    
    const resolvedSearchParams: OrderSearchParams = await searchParams;
    const getOrderListResponse: GetOrderListResponse = await getOrderList(resolvedSearchParams);
    const { orders, metadata } = getOrderListResponse.data;
    
    return (
        <>
            <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <OrderList orders={orders} metadata={metadata} />
                </main>
            </div>
        </>
    ) 
    
    

}

export default CategoryListPage;