// const vnpayConfig = {
//   vnp_TmnCode: process.env.VNP_TMNCODE,
//   vnp_HashSecret: process.env.VNP_HASHSECRET ,
//   vnp_Url: process.env.VNP_URL,
//   vnp_ReturnUrl: process.env.VNP_RETURNURL,
// };


interface VnpayConfig {
  vnp_TmnCode: string;
  vnp_HashSecret: string;
  vnp_Url: string;
  vnp_ReturnUrl: string;
}

const vnpayConfig = {
  vnp_TmnCode: process.env.VNP_TMNCODE || "",
  vnp_HashSecret: process.env.VNP_HASHSECRET || "",
  vnp_Url: process.env.VNP_URL || "",
  vnp_ReturnUrl: process.env.VNP_RETURNURL || "",
};
export default vnpayConfig;