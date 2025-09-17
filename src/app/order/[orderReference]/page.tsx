import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import OrderDetail from "@/components/order/OrderDetail";
import { RestConfiguration } from "@/schema/entity";
import { GetOrderDetailResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

type OrderDetailPageProps = {
  params: Promise<{
    orderReference: string;
  }>;
};

const getOrderDetail = async (orderReference: string): Promise<GetOrderDetailResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken();
    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/order/${orderReference}`;

    let headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    let response: AxiosResponse<GetOrderDetailResponse> = await agent.get(endpoint);

    return response.data;

}

const OrderDetailPage = async ({ params }: OrderDetailPageProps):Promise<JSX.Element> => {

    const resolvedParams = await params
    const { data } = await getOrderDetail(resolvedParams.orderReference)
    const { order } = data;

    return (
      <>
        <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <OrderDetail order={order} />
                </main>
            </div>
      </>
    )
}

export default OrderDetailPage;