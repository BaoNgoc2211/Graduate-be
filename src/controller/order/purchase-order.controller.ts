import asyncError from "../../middleware/error.middleware";
import purchaseOrderServices from "../../service/order/purchase-order.services";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";

class PurchaseOrderController {
    getAll = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderServices.getAll();
      returnRes(res, 200, "Get All", result);
    });
    getById = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderServices.getById(req.params.id);
      returnRes(res, 200, "Get Purchase Order By ID", result!);
    });
    create = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderServices.create(req.body);
      returnRes(res, 201, "Created", result);
    });
    update = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderServices.update(req.params.id, req.body);
      returnRes(res, 200, "Updated", result!);
    });
    delete = asyncError(async (req: Request, res: Response) => {
      await purchaseOrderServices.delete(req.params.id);
      returnRes(res, 200, "Deleted Successfully");
    });
}
const purchaseOrderController = new PurchaseOrderController();
export default purchaseOrderController;