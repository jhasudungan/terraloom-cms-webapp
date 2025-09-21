import { RestConfiguration } from '@/schema/entity';
import { NextApiResponse } from 'next';
import { cookies } from 'next/headers';

const getHTTPPropsWithToken = async (): Promise<RestConfiguration> => {

    const apiCmsHost: string = process.env.API_CMS_HOST || "http://localhost:8080"
    const defaultPerPage: string = process.env.DEFAULT_PER_PAGE || "5"

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        throw new Error('Authentication token not found');
    }

    const restConfiguration: RestConfiguration = {
        apiCmsAccessToken: token,
        apiCmsHost: apiCmsHost,
        apiCMSDefaultPerpage: defaultPerPage
    }

    return restConfiguration;

}

const getHTTPProps = (): RestConfiguration => {

    const apiCmsHost: string = process.env.API_CMS_HOST || "http://localhost:8080"
    const defaultPerPage: string = process.env.DEFAULT_PER_PAGE || "5"

    const restConfiguration: RestConfiguration = {
        apiCmsAccessToken: "",
        apiCmsHost: apiCmsHost,
        apiCMSDefaultPerpage: defaultPerPage
    }

    return restConfiguration;

}

const getQueryParamAsString = (param: string | string[] | undefined, defaultValue = ""): string => {

    if (Array.isArray(param)) {
        return param[0] || defaultValue;
    }

    return param || defaultValue;
}

interface ApiError {
    response?: {
        status?: number;
        data?: any;
    };
}

function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && 'response' in error;
}

export function handleProviderError(error: unknown, res: NextApiResponse) {
    console.error("Provider Error:", error);

    if (isApiError(error)) {
        console.error("Status:", error.response?.status, "Data:", error.response?.data);

        if (error.response?.status === 403) {
            return res.status(403).json({
                responseCode: "03",
                responseMessage: "Access denied"
            });
        }

        if (error.response?.data) {
            return res.status(error.response.status || 500).json(error.response.data);
        }
    }

    return res.status(500).json({
        responseCode: "99",
        responseMessage: "Internal Error",
    });
}

export { getHTTPPropsWithToken, getHTTPProps, getQueryParamAsString }