import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProductDetail from "@/components/product/ProductDetail";
import { RestConfiguration } from "@/schema/entity";
import { GetProductDetailResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getProductDetail = async (id: string): Promise<GetProductDetailResponse> => {

  const restConfiguration: RestConfiguration = await getHTTPPropsWithToken();
  const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/product/${id}`;

  let headers: object = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
  }

  const agent: AxiosInstance = axios.create({
      baseURL: endpoint,
      headers: headers
  })

  let response: AxiosResponse<GetProductDetailResponse> = await agent.get(endpoint);

  return response.data;

} 

const ProductDetailPage = async ({ params }: ProductDetailPageProps):Promise<JSX.Element> => {

    const resolvedParams = await params
    const { data } = await getProductDetail(resolvedParams.id)
    const { product } = data;

    return (
      <>
        <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <ProductDetail product={product} />
                </main>
            </div>
      </>
    )
}

export default ProductDetailPage;