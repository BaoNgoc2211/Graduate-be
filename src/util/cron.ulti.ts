import cron from "node-cron";
import Voucher from "../model/voucher.model";



cron.schedule("* * * * *", async () => {
  // console.log(`[CRON TEST] Run at ${new Date().toISOString()}`);
    await Voucher.updateMany(
    {
      endDate: { $lte: new Date() },
      isActive: true,
    },
    { $set: { isActive: false } }
  );

});
