import { Request, Response } from "express";
import asyncError from "../../middleware/error.middleware";
import stockServices from "../../service/inventory/stock.services";
import { returnRes } from "../../util/response";

class StockController {
  getAll = asyncError(async (req: Request, res: Response) => {
    const result = await stockServices.getAllStock();
    returnRes(res, 200, "Get All", result);
  });

  getById = asyncError(async (req: Request, res: Response) => {
    const result = await stockServices.getById(req.params.id);
    console.log(req.params.id);
    returnRes(res, 200, "Get Stock By ID", result!);
  });

  create = asyncError(async (req: Request, res: Response) => {
    const result = await stockServices.createStock(req.body);
    returnRes(res, 201, "Created", result);
  });

  update = asyncError(async (req: Request, res: Response) => {
    const result = await stockServices.updateStock(req.params.id, req.body);
    returnRes(res, 200, "Updated", result!);
  });

  delete = asyncError(async (req: Request, res: Response) => {
    const result = await stockServices.deleteStock(req.params.id);
    returnRes(res, 200, "Deleted", result!);
  });
}
export default new StockController();
