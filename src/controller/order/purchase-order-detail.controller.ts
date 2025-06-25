import asyncError from "../../middleware/error.middleware";
import purchaseOrderDetailServices from "../../service/order/purchase-order-detail.services";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";

class PurchaseOrderDetailController {
    getAll = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderDetailServices.getAll();
      returnRes(res, 200, "Get All", result);
    });
    getById = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderDetailServices.getById(req.params.id);
      returnRes(res, 200, "Get Purchase Order Detail By ID", result!);
    });
    create = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderDetailServices.create(req.body);
      returnRes(res, 201, "Created", result);
    }); 
    update = asyncError(async (req: Request, res: Response) => {
      const result = await purchaseOrderDetailServices.update(req.params.id, req.body);    
        returnRes(res, 200, "Updated", result!);
    }
    );
    delete = asyncError(async (req: Request, res: Response) => {
      await purchaseOrderDetailServices.delete(req.params.id);
      returnRes(res, 200, "Deleted Successfully");
    });
}
const purchaseOrderDetailController = new PurchaseOrderDetailController();
export default purchaseOrderDetailController;