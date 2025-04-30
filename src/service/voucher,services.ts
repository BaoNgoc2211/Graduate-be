import { IVoucher } from "../interface/voucher.interface";
import voucherRepository from "../repository/voucher.repository";

class VoucherServices {
  async createVoucher(voucher: IVoucher) {
    return await voucherRepository.create(voucher);
  }
}
const voucherServices = new VoucherServices();
export default voucherServices;
