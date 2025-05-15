import asyncError from "../middleware/error.middleware";
import { Response, Request } from "express";
import voucherServices from "../service/voucher.services";
import { returnRes } from "../util/response";
class VoucherController {
  addVoucher = asyncError(async (req: Request, res: Response) => {
    const data = await voucherServices.createVoucher(req.body);
    returnRes(res, 200, "Create Voucher successful", data);
  });
}
export default new VoucherController();
