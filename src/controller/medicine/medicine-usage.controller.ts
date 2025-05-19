import asyncError from "../../middleware/error.middleware";
import medUsageGroupService from "../../service/medicine/medicine-usage.services";
import { returnRes } from "../../util/response";
import { Response, Request } from "express";
class MedUsageGroupController {
  addMedUsage = asyncError(async (req: Request, res: Response) => {
    const { name, icon } = req.body;
    const data = await medUsageGroupService.add(name, icon);
    returnRes(res, 201, "Add Medicine Usage Group successful", data);
  });
  editMedUsage = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await medUsageGroupService.edit(id, req.body);
    returnRes(res, 200, "Edit Medicine usage group successful", data!);
  });
  deleteMedUsage = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await medUsageGroupService.remove(id);
    returnRes(res, 200, "Delete Medicine usage group successful", data!);
  });
}
const medUsageController = new MedUsageGroupController();
export default medUsageController;
