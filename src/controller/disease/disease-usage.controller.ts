import asyncError from "../../middleware/error.middleware";
import disUsageGroupService from "../../service/disease/disease-usage.services";
import { returnRes } from "../../util/response";
import { Response, Request } from "express";
class DisUsageGroupController {
  create = asyncError(async (req: Request, res: Response) => {
    const { name, icon } = req.body;
    const data = await disUsageGroupService.create(name, icon);
    returnRes(res, 201, "Add Disease Usage Group successful", data);
  });
  update = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disUsageGroupService.update(id, req.body);
    returnRes(res, 200, "Edit disease usage group successful", data!);
  });
  delete = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disUsageGroupService.delete(id);
    returnRes(res, 200, "Delete disease usage group successful", data!);
  });
  getAll = asyncError(async (req: Request, res: Response) => {
    const { usageName } = req.query;
    const data = await disUsageGroupService.getAll(usageName as string);
    returnRes(res, 200, "Get disease usage group successful", data!);
  });
}
const disUsageGroupController = new DisUsageGroupController();
export default disUsageGroupController;
