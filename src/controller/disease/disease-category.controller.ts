import asyncError from "../../middleware/error.middleware";
import { Response, Request } from "express";
import { returnRes } from "../../util/response";
import disCategoryService from "../../service/disease/disease-category.services";
class DisCategoryController {
  addDisCategory = asyncError(async (req: Request, res: Response) => {
    const { name, icon } = req.body;
    await disCategoryService.addDisCategory(name, icon);
    returnRes(res, 200, "Add Disease Category Successful");
  });
  editDisCategory = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disCategoryService.editDisCategory(id, req.body);
    returnRes(res, 200, "Edit disease category successful", data!);
  });
  deleteDisCategory = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await disCategoryService.deleteDisCategory(id);
    returnRes(res, 200, "Delete disease category successful", data!);
  });
}
const disCategoryController = new DisCategoryController();
export default disCategoryController;
