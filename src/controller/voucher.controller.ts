import asyncError from "../middleware/error.middleware";
import { Response, Request } from "express";
import voucherServices from "../service/voucher.services";
import { returnRes } from "../util/response";
class VoucherController {
  getAll = asyncError(async(req:Request,res:Response) =>{
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string )||10;
    const voucher = await voucherServices.getAllVoucher(page, limit);
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
  updateVoucher = asyncError(async(req:Request,res:Response)=>{
    const id = req.params.id;
    const data = req.body;
    const voucher = await voucherServices.updateVoucher(id,data);
    returnRes(res,200,"Update Voucher",voucher!)
  });
  deleteVoucher = asyncError(async(req:Request,res:Response)=>{
    const voucher = await voucherServices.deleteVoucher(req.params.id);
    returnRes(res,200,"Delete Voucher",voucher!)
  })
}
export default new VoucherController();
