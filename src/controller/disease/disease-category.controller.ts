import asyncError from "../../middleware/error.middleware";
import { Response, Request } from "express";
import { returnRes } from "../../util/response";
import disCategoryService from "../../service/disease/disease-category.services";
class DisCategoryController {
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
  getAllCategory = asyncError(async (req: Request, res: Response) => {
    const { categoryName } = req.query;
    const data = await disCategoryService.getAllCategory(
      categoryName as string
    );
    returnRes(res, 200, "Get disease category successful", data!);
  });
}
const disCategoryController = new DisCategoryController();
export default disCategoryController;
