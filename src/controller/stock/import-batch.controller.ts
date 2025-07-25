import { Response, Request } from "express";
import asyncError from "../../middleware/error.middleware";
import importBatchServices from "../../service/inventory/import-batch.services";
import { returnRes } from "../../util/response";
class ImportBatchController {
  addDistributor = asyncError(async (req: Request, res: Response) => {
    const data = await importBatchServices.addImportBatch(req.body);
    returnRes(res, 200, "Add Distributor Successful",data);
  });
  getImportBatchById = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await importBatchServices.getImportBatchById(id);
    returnRes(res, 200, "Get Import Batch By Id Successful", data!);
  });
  getAllImportBatches = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string )||10;
    const data = await importBatchServices.getAllImportBatches(page, limit);
    returnRes(res, 200, "Get All Import Batches Successful", data);
  });
  updateImportBatch = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await importBatchServices.updateImportBatch(id, req.body);
    returnRes(res, 200, "Update Import Batch Successful", data!);
  });
  updateImportBatchStatus = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const data = await importBatchServices.updateImportBatchStatus(id, status);
    returnRes(res, 200, "Update Import Batch Status Successful", data!);
  });
  deleteImportBatch = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    await importBatchServices.deleteImportBatch(id);
    returnRes(res, 200, "Delete Import Batch Successful");
  });
}
const importBatchController = new ImportBatchController();
export default importBatchController;
