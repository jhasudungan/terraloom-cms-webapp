import { RestConfiguration } from '@/schema/entity';
import { NextApiResponse } from 'next';
import { cookies } from 'next/headers';

const getHTTPPropsWithToken = async (): Promise<RestConfiguration> => {
    
    let apiCmsHost: string = process.env.API_CMS_HOST || "http://localhost:8080"
    let defaultPerPage: string = process.env.DEFAULT_PER_PAGE || "5"
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
        throw new Error('Authentication token not found');
    }

    const restConfiguration: RestConfiguration =  {
        apiCmsAccessToken: token,
        apiCmsHost: apiCmsHost,
        apiCMSDefaultPerpage: defaultPerPage
    }

    return restConfiguration;

}

const getHTTPProps = ():RestConfiguration => {
    
    let apiCmsHost: string = process.env.API_CMS_HOST || "http://localhost:8080"
    let defaultPerPage: string = process.env.DEFAULT_PER_PAGE || "5"
       
    const restConfiguration: RestConfiguration =  {
        apiCmsAccessToken: "",
        apiCmsHost: apiCmsHost,
        apiCMSDefaultPerpage: defaultPerPage
    }

    return restConfiguration;

}

const  getQueryParamAsString = (param: string | string[] | undefined, defaultValue = ""):string => {
  
  if (Array.isArray(param)) {
    return param[0] || defaultValue;
  }

  return param || defaultValue;
}

export function handleProviderError(error: any, res: NextApiResponse) {
    console.error("Provider Error:", error?.response?.status, error?.response?.data);

     if (error.response?.status === 403) {
        return res.status(403).json({
            responseCode: "03",
            responseMessage: "Access denied"
        });
    }

    if (error.response?.data) {
        return res.status(error.response.status || 500).json(error.response.data);
    }

    return res.status(500).json({
        responseCode: "99",
        responseMessage: "Internal Error",
    });
}

export { getHTTPPropsWithToken, getHTTPProps, getQueryParamAsString }