import cron from "node-cron";
import voucherServices from "../service/voucher.services";

//voucher
// Cron chạy mỗi ngày lúc 00:00
cron.schedule("0 0 * * *", async () => {
  console.log("[Voucher Cron] Running...");
  try {
    await voucherServices.deactivateExpiredVouchers();
  } catch (error) {
    console.error("[Voucher Cron] Error:", error);
  }
});