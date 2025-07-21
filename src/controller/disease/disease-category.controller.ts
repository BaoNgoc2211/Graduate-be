import asyncError from "../../middleware/error.middleware";
import { Response, Request } from "express";
import { returnRes } from "../../util/response";
import disCategoryService from "../../service/disease/disease-category.services";
class DisCategoryController {
  getAll = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string )||10;
    const categories = await disCategoryService.getAll(page,limit);
    return returnRes(res, 200, "Get all Disease Category", categories);
  });

  getById = asyncError(async (req: Request, res: Response) => {
    const category = await disCategoryService.getById(req.params.id);
    return returnRes(res, 200, "Get By Id Disease Category", category!);
  });
  create = asyncError(async (req: Request, res: Response) => {
    const { name, icon } = req.body;
    await disCategoryService.create(name, icon);
    returnRes(res, 200, "Add Disease Category Successful");
  });
  update = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disCategoryService.update(id, req.body);
    returnRes(res, 200, "Edit disease category successful", data!);
  });
  delete = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disCategoryService.delete(id);
    returnRes(res, 200, "Delete disease category successful", data!);
  });
}
const disCategoryController = new DisCategoryController();
export default disCategoryController;
