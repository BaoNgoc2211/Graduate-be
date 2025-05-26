import crypto from "crypto";
import vnpayConfig from "../config/vnpay.config";
import qs from "qs";

function sortObject(obj: any) {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      sorted[key] = obj[key];
    }
  }
  return sorted;
}

export const generatePaymentUrl = (amount: number, orderId: string, config = vnpayConfig) => {
    
  const date = new Date();
  const pad = (n: number) => n < 10 ? '0' + n : n;
  const createDate = 
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds());

  const vnp_Params: any = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: config.vnp_TmnCode,
    vnp_Amount: amount * 100,
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `Payment for order ${orderId}`,
    vnp_OrderType: "other",
    vnp_Locale: "vn",
    vnp_ReturnUrl: config.vnp_ReturnUrl,
    vnp_IpAddr: "127.0.0.1",
    vnp_CreateDate: createDate,
  };

  // Sort and filter params
  const sortedParams = sortObject(vnp_Params);
//   const signData = Object.entries(sortedParams)
//     .map(([key, value]) => `${key}=${String(value)}`)
//     .join('&');
  const signData = qs.stringify(sortedParams, { encode: false }); 
  const secureHash = crypto
    .createHmac('sha512', config.vnp_HashSecret)
    .update(signData)
    .digest('hex');
    

  sortedParams.vnp_SecureHash = secureHash;
  const queryString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')

  return `${config.vnp_Url}?${queryString}`;
};

export const verifyPaymentResponse = (response: any, config = vnpayConfig) => {
  const { vnp_SecureHash, vnp_SecureHashType, ...rest } = response;
  // Loại bỏ các giá trị rỗng/undefined trước khi ký
  const sortedParams = sortObject(rest);
//   const signData = Object.entries(sortedParams)
//     .map(([key, value]) => `${key}=${String(value)}`)
//     .join('&');
  const signData = qs.stringify(sortedParams, { encode: false });
  const hash = crypto
    .createHmac('sha512', config.vnp_HashSecret)
    .update(signData)
    .digest('hex');
  return vnp_SecureHash === hash;
};