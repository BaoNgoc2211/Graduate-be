// import * as crypto from 'crypto';
// import vnpayConfig from '../config/vnpay.config';

// function sortObject(obj: Record<string, any>) {
//   const sorted: Record<string, any> = {};
//   Object.keys(obj)
//     .sort()
//     .forEach((key) => {
//       sorted[key] = obj[key];
//     });
//   return sorted;
// }

// function filterObject(obj: Record<string, any>) {
//   const filtered: Record<string, any> = {};
//   Object.keys(obj).forEach((key) => {
//     if (obj[key] !== undefined && obj[key] !== "") {
//       filtered[key] = obj[key];
//     }
//   });
//   return filtered;
// }

// export function createVNPayUrl(amount: number, orderId: string, ipAddr: string): string {
//   const date = new Date();
//   const pad = (n: number) => n < 10 ? '0' + n : n;
//   const createDate =
//     date.getFullYear().toString() +
//     pad(date.getMonth() + 1) +
//     pad(date.getDate()) +
//     pad(date.getHours()) +
//     pad(date.getMinutes()) +
//     pad(date.getSeconds());
//   const orderInfo = `Thanh toan don hang ${orderId}`;
//   const vnp_Params: any = {
//     vnp_Version: '2.1.0',
//     vnp_Command: 'pay',
//     vnp_TmnCode: vnpayConfig.vnp_TmnCode,
//     vnp_Locale: 'vn',
//     vnp_CurrCode: 'VND',
//     vnp_TxnRef: orderId,
//     vnp_OrderInfo: orderInfo,
//     vnp_OrderType: 'other',
//     vnp_Amount: amount * 100,
//     vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
//     vnp_IpAddr: ipAddr,
//     vnp_CreateDate: createDate,
//   };

//   // LỌC các trường rỗng/undefined
//   const filteredParams = filterObject(vnp_Params);
//   // SẮP XẾP key
//   const sortedParams = sortObject(filteredParams);
//   // KHÔNG encode khi tạo signData
//   const signData = Object.entries(sortedParams)
//     .map(([key, value]) => `${key}=${value}`)
//     .join('&');
//   // Tạo secureHash
//   const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
//   const secureHash = hmac.update(signData).digest('hex');
//   sortedParams.vnp_SecureHash = secureHash;

//   // Encode khi tạo query string
//   const queryString = Object.entries(sortedParams)
//     .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
//     .join('&');
//   return `${vnpayConfig.vnp_Url}?${queryString}`;
// }


// export function verifyVNPayCallback(query: any): boolean {
//   const params: Record<string, string> = {};
//   Object.keys(query).forEach((key) => {
//     if (
//       key !== 'vnp_SecureHash' &&
//       key !== 'vnp_SecureHashType' &&
//       query[key] !== undefined &&
//       query[key] !== ""
//     ) {
//       params[key] = Array.isArray(query[key]) ? query[key][0] : query[key];
//     }
//   });
//   const filteredParams = filterObject(params);
//   const signData = Object.entries(sortObject(filteredParams))
//     .map(([key, value]) => `${key}=${value}`)
//     .join('&');
//   const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
//   const checkSum = hmac.update(signData).digest('hex');
//   const secureHash = Array.isArray(query['vnp_SecureHash'])
//     ? query['vnp_SecureHash'][0]
//     : query['vnp_SecureHash'];

//   console.log("signData:", signData);
//   console.log("secureHash (tính toán):", checkSum);
//   console.log("secureHash (VNPay gửi):", secureHash);
//   return secureHash === checkSum;
// }