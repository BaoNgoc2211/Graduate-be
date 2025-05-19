import asyncError from "../../middleware/error.middleware";
import distributorServices from "../../service/medicine/distributor.services";
import { returnRes } from "../../util/response";
import { Response, Request } from "express";
class DistributorController {
  addDistributor = asyncError(async (req: Request, res: Response) => {
    const data = await distributorServices.addDistributor(req.body)
    returnRes(res, 200, "Add Distributor Successful");
  });
}
const distributorController = new DistributorController();
export default distributorController;
