export interface MomoPaymentResponse {
    partnerCode: string;
    requestId: string;
    orderId: string;
    payUrl: string;
    errorCode: number;
    message: string;
    localMessage: string;
    qrCodeUrl?: string;
    deeplink?: string;
    deeplinkWebInApp?: string;
}