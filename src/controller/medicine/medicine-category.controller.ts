import { Request, Response } from "express";
import { MedicineCategoryService } from "../../service/medicine/medicine-category.services";
import mongoose from "mongoose";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";

class MedicineCategoryController {
  
  getAll = asyncError (async(req: Request, res: Response) => {
      const categories = await MedicineCategoryService.getAll();
      return returnRes(res,200,"Fetch successfully",categories);
  });

  getById = asyncError( async(req: Request, res: Response) => {
    const { id } = req.params;

    // Kiểm tra định dạng ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return returnRes(res,400,"Invalid ID format");
    }
    const category = await MedicineCategoryService.getById(id);
    // Nếu không tìm thấy
    if (!category) {
      return returnRes(res,404,"Medicine Category not found");
    }
    return returnRes(res,200,"Fetch Successfully",category);
  });

  create = asyncError( async(req: Request, res: Response) =>{
    const category = await MedicineCategoryService.create(req.body);
    return returnRes(res,201,"Created",category)
  });
  
  update = asyncError(async(req:Request,res:Response)=>{
    const updated =  await MedicineCategoryService.update(req.params.id, req.body);
    if(!updated)
    {
      return returnRes(res,404,"Not found");
    }
    return returnRes(res,200,"Updated Successfully",updated);
  });
  
  delete = asyncError(async(req:Request, res:Response)=>{
    const deleted = await MedicineCategoryService.delete(req.params.id);
    if(!deleted)
    {
      return returnRes(res,404,"Not found");
    }
    return returnRes(res,200,"Deleted successfully",deleted)
  });

}

export default new MedicineCategoryController();