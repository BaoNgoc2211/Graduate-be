import { Request, Response } from "express";
import { MedicineCategoryService } from "../../service/medicine/medicine-category.services";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";

class MedicineCategoryController {
  
  getAll = asyncError (async(req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const categories = await MedicineCategoryService.getAll(page, limit);
     returnRes(res,200,"Get all Medicine",categories);
  });

  getById = asyncError( async(req: Request, res: Response) => {
    const category = await MedicineCategoryService.getById(req.params.id);
     returnRes(res,200,"Get Id Medicine",category!);

  });

  create = asyncError( async(req: Request, res: Response) =>{
    const category = await MedicineCategoryService.create(req.body);
     returnRes(res,201,"Created MedCate",category)
  });
  
  update = asyncError(async(req:Request,res:Response)=>{
    const updated =  await MedicineCategoryService.update(req.params.id, req.body);
     returnRes(res,200,"Updated MedCate",updated!);
  });
  
  delete = asyncError(async(req:Request, res:Response)=>{
    const deleted = await MedicineCategoryService.delete(req.params.id);
    returnRes(res,200,"Deleted MedCate",deleted!)
  });

}

export default new MedicineCategoryController();