import asyncError from "../../middleware/error.middleware";
import distributorServices from "../../service/inventory/distributor.services";
import { returnRes } from "../../util/response";
import { Response, Request } from "express";
class DistributorController {
  addDistributor = asyncError(async (req: Request, res: Response) => {
    const data = await distributorServices.addDistributor(req.body)
    returnRes(res, 200, "Add Distributor Successful",data);
  });
  getDistributorById = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await distributorServices.getDistributorById(id);
    returnRes(res, 200, "Get Distributor By Id Successful", data!);
  });
  getAllDistributor = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string )||10;
    const distributors = await distributorServices.getAllDistributors(page,limit);
    returnRes(res, 200, "Get All Distributors Successful", distributors);
  });
  updateDistributor = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await distributorServices.updateDistributor(id, req.body);
    returnRes(res, 200, "Update Distributor Successful", data!);
  });
  deleteDistributor = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    await distributorServices.deleteDistributor(id);
    returnRes(res, 200, "Delete Distributor Successful");
  });
}
const distributorController = new DistributorController();
export default distributorController;
                                                                   
