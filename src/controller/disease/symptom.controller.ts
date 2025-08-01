import asyncError from "../../middleware/error.middleware";
import { Response, Request } from "express";
import { returnRes } from "../../util/response";
import symptomService from "../../service/disease/symptom.services";
class SymptomController {
  create = asyncError(async (req: Request, res: Response) => {
    const data = await symptomService.create(req.body);
    returnRes(res, 200, "Add Symptom Successful", data!);
  });
  update = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await symptomService.update(id, req.body);
    returnRes(res, 200, "Edit symptom successful", data!);
  });
  delete = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await symptomService.delete(id);
    returnRes(res, 200, "Delete symptom successful", data!);
  });
}
const symptomController = new SymptomController();
export default symptomController;
