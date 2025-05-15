import { Request, Response } from "express";
import { MedicineCategoryService } from "../../service/medicine/medicine-category.services";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";

class MedicineCategoryController {
  
  getAll = asyncError (async(req: Request, res: Response) => {
    const categories = await MedicineCategoryService.getAll();
    return returnRes(res,200,"Get all Medicine",categories);
  });

  getById = asyncError( async(req: Request, res: Response) => {
    const category = await MedicineCategoryService.getById(req.params.id);
    return returnRes(res,200,"Get Id Medicine",category!);
  });

  create = asyncError( async(req: Request, res: Response) =>{
    const category = await MedicineCategoryService.create(req.body);
    return returnRes(res,201,"Created MedCate",category)
  });
  
  update = asyncError(async(req:Request,res:Response)=>{
    const updated =  await MedicineCategoryService.update(req.params.id, req.body);
    return returnRes(res,200,"Updated MedCate",updated!);
  });
  
  delete = asyncError(async(req:Request, res:Response)=>{
    const deleted = await MedicineCategoryService.delete(req.params.id);
    return returnRes(res,200,"Deleted MedCate",deleted!)
  });

}

export default new MedicineCategoryController();