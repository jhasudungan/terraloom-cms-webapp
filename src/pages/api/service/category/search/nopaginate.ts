import { RestConfiguration } from '@/schema/entity';
import { getHTTPProps, getQueryParamAsString, handleProviderError } from '@/util/httpUtil';
import axios, { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const searchCategoryNoPaginate = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(405).end()
    };

    const restConfiguration: RestConfiguration = getHTTPProps();
    const { name , id, isActive } = req.query;
    let queryName = getQueryParamAsString(name);
    let queryId = getQueryParamAsString(id);
    let queryIsActive = getQueryParamAsString(isActive);
    
    const params: URLSearchParams = new URLSearchParams({
        'isPaginate': "false",
        'perPage': "",
        'page': "",
        'name': queryName,
        'id': queryId,
        'isActive': queryIsActive,
    });

    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/categories?${params.toString()}`;

    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: {
            Authorization: `Bearer ${req.cookies.token}`, 
        },
    })

    let providerResponse = null;

    try {
        providerResponse = await agent.get(endpoint);
        return res.status(200).json(providerResponse.data);
    } catch(error: any) {
        return handleProviderError(error, res);
    } 

}

export default searchCategoryNoPaginate;