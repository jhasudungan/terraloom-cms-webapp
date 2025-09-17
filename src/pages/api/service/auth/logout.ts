import { NextApiRequest, NextApiResponse } from 'next';

const logoutService = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'GET') {
        return res.status(405).end()
    };

    // Invalidate the token cookie
    res.setHeader('Set-Cookie', [
        `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`
    ]);

    return res.status(200).json({
        responseCode: "00",
        responseMessage: "Logged out successfully"
    });
    
}

export default logoutService;