import { IVoucher } from "../interface/voucher.interface";
import Voucher from "../model/voucher.model";

class VoucherRepository {
  async getAllVoucher() {
    return await Voucher.find();
  }

  async getValidateVoucher() {
    const now = new Date();
    const validVoucher =  await Voucher.find({
      isActive:true,
      $or:[
        {
          endDate: { $exists:false}
        },
        {
          endDate: { $gte:now}
        }
      ]
    })
    return validVoucher;
  }

  async create(voucher: IVoucher) {
    return await Voucher.create(voucher);
  }
  async edit(id: string, voucher: IVoucher) {
    return await Voucher.findByIdAndUpdate(id, voucher, { new: true });
  }
  async delete(id: string) {
    return await Voucher.findByIdAndDelete(id);
  }
  
  // async getAllVoucher(code: string) {
  //   const filter = await Voucher.aggregate([
  //     // tìm theo tên gần đúng, không phân biệt hoa và thường
  //     {
  //       $match: {
  //         code: new RegExp(code, "i"),
  //       },
  //     },
  //     // tìm theo loại giảm giá phần trăm và cố định
  //     // tìm theo phạm vi áp dụng 
  //   ]);
  //   return filter;
  // }
   async expireVouchersByDate(currentDate: Date) {
    return Voucher.updateMany(
      { endDate: { $lt: currentDate }, isActive: true },
      { $set: { isActive: false } }
    );
  }
}
export default new VoucherRepository();
