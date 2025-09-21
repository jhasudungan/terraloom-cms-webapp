import { RestConfiguration } from '@/schema/entity';
import { getHTTPProps, handleProviderError } from '@/util/httpUtil';
import axios, { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const loginService = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(405).end()
    };

    const restConfiguration: RestConfiguration = getHTTPProps();
    const endpoint:string = `${restConfiguration.apiCmsHost}/api/auth/login`;
    
    const agent: AxiosInstance = axios.create({
        baseURL: endpoint
    })

    let providerResponse = null;

    try {
        
        providerResponse = await agent.post(endpoint, req.body);

        // Extract token and user data from the nested structure
        const tokenData = providerResponse.data.data.token.token;
        const expiredAt = providerResponse.data.data.token.expiredAt;
        
        // Calculate Max-Age from expiredAt
        const expirationDate = new Date(expiredAt);
        const currentDate = new Date();
        const maxAge = Math.floor((expirationDate.getTime() - currentDate.getTime()) / 1000);

        // Set cookies
        const cookies = [
            `token=${tokenData}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`,
        ];
        
        res.setHeader('Set-Cookie', cookies);

        return res
            .status(202)
            .json(providerResponse.data);

    } catch (error: unknown) {

        return handleProviderError(error, res);
    
    }

    
}

export default loginService;