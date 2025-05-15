import asyncError from "../../middleware/error.middleware";
import disUsageGroupService from "../../service/disease/disease-usage.services";
import { returnRes } from "../../util/response";
import { Response, Request } from "express";
class DisUsageGroupController {
  addDisUsage = asyncError(async (req: Request, res: Response) => {
    const { name, icon } = req.body;
    const data = await disUsageGroupService.addDiseaseUsageGroup(name, icon);
    returnRes(res, 201, "Add Disease Usage Group successful", data);
  });
  editDisUsage = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disUsageGroupService.editDiseaseUsageGroup(id, req.body);
    returnRes(res, 200, "Edit disease usage group successful", data!);
  });
  deleteDisUsage = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disUsageGroupService.removeDiseaseUsageGroup(id);
    returnRes(res, 200, "Delete disease usage group successful", data!);
  });
}
const disUsageGroupController = new DisUsageGroupController();
export default disUsageGroupController;
