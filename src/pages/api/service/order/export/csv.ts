import { RestConfiguration } from '@/schema/entity';
import { getHTTPProps, getQueryParamAsString, handleProviderError } from '@/util/httpUtil';
import axios, { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const exportOrderCSV = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(405).end()
    };

    const restConfiguration: RestConfiguration = getHTTPProps();
    const { startDate , endDate, status } = req.query;
    let queryStartDate = getQueryParamAsString(startDate);
    let queryEndDate = getQueryParamAsString(endDate);
    let queryStatus = getQueryParamAsString(status);
    
    const params: URLSearchParams = new URLSearchParams({
        'startDate': queryStartDate,
        'endDate': queryEndDate,
        'status': queryStatus,
    });

    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/report/order/csv?${params.toString()}`;
    
    try {
        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`,
            },
            responseType: "stream",
        });

        // Forward headers
        res.setHeader(
            "Content-Disposition",
            response.headers["content-disposition"] || "attachment; filename=orders.csv"
        );
        res.setHeader("Content-Type", response.headers["content-type"] || "text/csv");

        // Pipe response stream to client
        response.data.pipe(res);
    } catch (error: any) {
        return handleProviderError(error, res);
    }

    

}

export default exportOrderCSV;