import { IVoucher } from "../interface/voucher.interface";
import voucherRepository from "../repository/voucher.repository";

class VoucherServices {
  async createVoucher(voucher: IVoucher) {
    return await voucherRepository.create(voucher);
  }

  async deactivateExpiredVouchers(): Promise<void> {
    const now = new Date();
    const result = await voucherRepository.expireVouchersByDate(now);
    console.log(
      `[VoucherService] ${result.modifiedCount} vouchers expired and deactivated.`
    );
  }
}
const voucherServices = new VoucherServices();
export default voucherServices;
