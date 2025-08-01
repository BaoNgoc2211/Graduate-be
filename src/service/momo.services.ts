import * as https from 'https';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { MomoPaymentResponse } from '../interface/momo.interface';

dotenv.config();

interface MomoPaymentRequest {
    amount: string;
    orderInfo: string;
}

export const createMomoPayment = async ({ amount, orderInfo }: MomoPaymentRequest): Promise<MomoPaymentResponse> => {
    const partnerCode = process.env.MOMO_PARTNER_CODE || "";
    const accessKey = process.env.MOMO_ACCESS_KEY || "";
    const secretKey = process.env.MOMO_SECRET_KEY || "";
    const redirectUrl = process.env.MOMO_REDIRECT_URL || "";
    const ipnUrl = process.env.MOMO_IPN_URL || "";
    const requestId = `${partnerCode}${Date.now()}`;
    const orderId = requestId;
    const requestType = 'captureWallet';
    const extraData = '';

    // Create raw signature
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Create HMAC signature
    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: 'en'
    });

    const options: https.RequestOptions = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(responseData);
                    resolve(result); // Trả về object chứa payUrl và các info khác
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(requestBody);
        req.end();
    });
};
