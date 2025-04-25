import asyncError from "../middleware/error.middleware";

class MedicineCategoryController {
  addCategory = asyncError(async (req: Request, res: Response) => {
    const { name } = req.body;
    const cate = await cate;
  });
}
