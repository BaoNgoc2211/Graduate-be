import asyncError from "../../middleware/error.middleware";
import diseaseServices from "../../service/disease.services";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";
class DiseaseController {
  addDisease = asyncError(async (req: Request, res: Response) => {
    const data = await diseaseServices.createDisease(req.body);
    returnRes(res, 201, "Add disease successful", data);
  });
  editDisease = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await diseaseServices.editDisease(id, req.body);
    returnRes(res, 200, "Edit disease successful", data);
  });
}
const diseaseController = new DiseaseController();
export default diseaseController;
