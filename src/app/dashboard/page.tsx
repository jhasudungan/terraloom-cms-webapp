import ExportReportForm from "@/components/dashboard/ExportReportForm";
import ReportTab from "@/components/dashboard/ReportTab";
import OrderReportTab from "@/components/dashboard/ReportTab";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { RestConfiguration } from "@/schema/entity";
import { GetDashboardReportResponse } from "@/schema/response";
import { getHTTPPropsWithToken } from "@/util/httpUtil";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { JSX } from "react";

const getDashboardReport = async(): Promise<GetDashboardReportResponse> => {

    const restConfiguration: RestConfiguration = await getHTTPPropsWithToken()
    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/report/dashboard`;

    const headers: object = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${restConfiguration.apiCmsAccessToken}`
    }

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: headers
    })

    const response: AxiosResponse<GetDashboardReportResponse> = await agent.get(endpoint);

    return response.data;

}

const DashbordPage = async ():Promise<JSX.Element> => {

    const getDashboardReportResponse: GetDashboardReportResponse = await getDashboardReport();
    
    return (
        <>
            <DashboardNavbar />
            {/* flex to make the sidebar and main sit next to each oter */}
            <div className="flex min-h-screen">
            <DashboardSidebar />
                {/* flex-1 told the the main to take everyspace left after sidebar */}
                <main className="flex-1 p-10 overflow-auto overflow-x-auto">
                    <ReportTab 
                        orderReport={getDashboardReportResponse.data.orderReport}
                        accountReport={getDashboardReportResponse.data.accountReport}
                    />
                    <ExportReportForm />
                </main>
            </div>
        </>
    )
}

export default DashbordPage;