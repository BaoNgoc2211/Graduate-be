import mongoose from "mongoose";
import asyncError from "../../middleware/error.middleware";
import diseaseServices from "../../service/disease/disease.services";
import { returnRes } from "../../util/response";
import { Request, Response } from "express";
class DiseaseController {
  create = asyncError(async (req: Request, res: Response) => {
    const data = await diseaseServices.create(req.body);
    returnRes(res, 201, "Add disease successful", data);
  });
  update = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await diseaseServices.update(id, req.body);
    returnRes(res, 200, "Edit disease successful", data!);
  });
  delete = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await diseaseServices.delete(new mongoose.Types.ObjectId(id));
    returnRes(res, 200, "Delete disease successful", data!);
  });
  getDetail = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await diseaseServices.getById(id);
    returnRes(res, 200, "Get disease detail successful", data!);
  });
  getAllDiseases = asyncError(async (req: Request, res: Response) => {
     const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const data = await diseaseServices.getAll(page,limit);
    returnRes(res, 200, "Get all diseases successful", data);
  });
}
const diseaseController = new DiseaseController();
export default diseaseController;
