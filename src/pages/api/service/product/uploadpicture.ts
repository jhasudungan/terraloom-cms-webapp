import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Client } from 'minio';
import { IncomingForm, File } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { handleProviderError } from '@/util/httpUtil';

const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin123'
});

export const config = {
    api: {
        bodyParser: false, // Disable body parsing for file uploads
    },
};

const uploadProductPictureService = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(405).json({
            responseCode: '99',
            responseMessage: 'Method not allowed'
        });
    }

    const uploadDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const form = new IncomingForm({
        uploadDir,
        keepExtensions: true, // Keep file extensions
        maxFileSize: 10 * 1024 * 1024, // 10MB limit
        multiples: false, // Single file only
    });

    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve([fields, files]);
        });
    });

    const rawFile = files.file;
    const file = Array.isArray(rawFile) ? rawFile[0] : rawFile;

    if (!file || typeof file.filepath !== 'string') {
        // mimick provider response
        return res.status(400).json({
            responseCode: '04',
            responseMessage: 'File can not be empty or invalid'
        });
    }

    try {
        // Generate unique filename
        const fileExtension = path.extname(file.originalFilename || '');
        const folderPath = 'products';
        const uniqueFilename = `${folderPath}/${uuidv4()}${fileExtension}`;

        // Define bucket name
        const bucketName = 'terraloom';
        const bucketExists = await minioClient.bucketExists(bucketName);

        if (!bucketExists) {
            await minioClient.makeBucket(bucketName);

            const policy = {
                Version: '2012-10-17',
                Statement: [{
                    Effect: 'Allow',
                    Principal: { AWS: ['*'] },
                    Action: ['s3:GetObject'],
                    Resource: [`arn:aws:s3:::${bucketName}/*`]
                }]
            };

            await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
        }

        // Upload file using file path
        await minioClient.fPutObject(bucketName, uniqueFilename, file.filepath);

        // Generate public URL
        const baseUrl = process.env.MINIO_PUBLIC_URL || 'http://localhost:9000';
        const fileUrl = `${baseUrl}/${bucketName}/${uniqueFilename}`;
        const fileUrlSecure = `${process.env.MINIO_SECURE_ENDPOINT}/${bucketName}/${uniqueFilename}`

        // Clean up temporary file
        fs.unlinkSync(file.filepath);

        // Return success response
        res.status(200).json({
            responseCode: "00",
            responseMessage: "Success",
            data: {
                filename: uniqueFilename,
                originalName: file.originalFilename,
                url: fileUrl,
                secureUrl: fileUrlSecure,
                size: file.size,
                type: file.mimetype,
                bucket: bucketName
            }
        });

    } catch (uploadError: any) {
        console.error('Upload error:', uploadError);
        return handleProviderError(uploadError, res);
    }

}


export default uploadProductPictureService;