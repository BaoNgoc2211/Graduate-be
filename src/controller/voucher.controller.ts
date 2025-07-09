import asyncError from "../middleware/error.middleware";
import { Response, Request } from "express";
import voucherServices from "../service/voucher.services";
import { returnRes } from "../util/response";
class VoucherController {
  getAll = asyncError(async(req:Request,res:Response) =>{
    const voucher = await voucherServices.getAllVoucher();
    returnRes(res,200,"Get All Voucher",voucher)
  });
  getValidVoucher = asyncError(async(req:Request,res:Response) =>{
    const voucher = await voucherServices.getValidVoucher();
    returnRes(res,200,"Get Valid Voucher",voucher)
  });
  addVoucher = asyncError(async (req: Request, res: Response) => {
    const data = await voucherServices.createVoucher(req.body);
    returnRes(res, 200, "Create Voucher successful", data);
  });
}
export default new VoucherController();
