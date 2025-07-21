import { IVoucher } from "../interface/voucher.interface";
import voucherRepository from "../repository/voucher.repository";

class VoucherServices {
  async getAllVoucher(page:number, limit:number) {
    return await voucherRepository.getAllVoucher(page, limit);
  }
  async getValidVoucher(){
    return await voucherRepository.getValidateVoucher();
  }
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
  async updateVoucher(id:string, voucher:any){
    return await voucherRepository.edit(id,voucher);
  }
  async deleteVoucher(id:string){
    return await voucherRepository.delete(id);
  }
}
const voucherServices = new VoucherServices();
export default voucherServices;
