import { RestConfiguration } from '@/schema/entity';
import { getHTTPProps, handleProviderError } from '@/util/httpUtil';
import axios, { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const updatePasswordService = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'PUT') {
        return res.status(405).end()
    };

    const restConfiguration: RestConfiguration = getHTTPProps();
    const endpoint:string = `${restConfiguration.apiCmsHost}/api/v1/user/update-password`;
    
    const agent: AxiosInstance = axios.create({
        baseURL: endpoint,
        headers: {
            Authorization: `Bearer ${req.cookies.token}`, 
        },
    })

    let providerResponse = null;

    try {
        providerResponse = await agent.put(endpoint, req.body);
        return res.status(200).json(providerResponse.data);
    } catch(error: any) {
        return handleProviderError(error, res);
    } 

}

export default updatePasswordService;