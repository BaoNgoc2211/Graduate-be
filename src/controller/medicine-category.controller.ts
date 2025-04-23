import { catchAsync } from "../util/catchAsync";

class MedicineCategoryController {
  addCategory = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body;
    const cate = await cate;
  });
}
