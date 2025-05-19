import { Response, Request } from "express";
import asyncError from "../../middleware/error.middleware";
import importBatchServices from "../../service/medicine/import-batch.services";
import { returnRes } from "../../util/response";
class ImportBatchController {
  addDistributor = asyncError(async (req: Request, res: Response) => {
    const data = await importBatchServices.addImportBatch(req.body);
    returnRes(res, 200, "Add Distributor Successful");
  });
}
const importBatchController = new ImportBatchController();
export default importBatchController;
