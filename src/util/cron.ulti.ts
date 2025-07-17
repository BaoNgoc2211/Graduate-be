import cron from "node-cron";
import Voucher from "../model/voucher.model";

// //voucher
// // Cron chạy mỗi ngày lúc 00:00
// cron.schedule("0 0 * * *", async () => {
//   const now = new Date();

//   const result = await Voucher.updateMany(
//     {
//       endDate: { $lte: now },
//       isActive: true,
//     },
//     { $set: { isActive: false } }
//   );

//   console.log(`[CRON] Deactivated ${result.modifiedCount} expired vouchers`);
// });
// Chạy mỗi phút

cron.schedule("* * * * *", async () => {
  console.log(`[CRON TEST] Run at ${new Date().toISOString()}`);
  const result = await Voucher.updateMany(
    {
      endDate: { $lte: new Date() },
      isActive: true,
    },
    { $set: { isActive: false } }
  );
  console.log(`[CRON TEST] Modified ${result.modifiedCount} vouchers`);
});
