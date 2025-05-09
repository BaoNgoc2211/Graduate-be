import { Request, Response } from "express";
import medicineServices from "../../service/medicine/medicine.services";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";
import mongoose from "mongoose";

class MedicineController {
  getAll = asyncError(async(req: Request, res: Response) => {
    const medicines = await medicineServices.getAllMedicines();
    return returnRes(res,200,"Fetch successfully",medicines);
  });

  getById = asyncError( async(req: Request, res: Response) => {
    const { id } = req.params;
    // Kiểm tra định dạng ID có hợp lệ không
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return returnRes(res,400,"Invalid ID format");
    // }
    const medicine = await medicineServices.getMedicineById(id);
    // Nếu không tìm thấy
    if (!medicine) {
      return returnRes(res,404,"Medicine not found");
    }
    return returnRes(res,200,"Fetch Successfully",medicine);
  });


  create = asyncError(async (req: Request, res: Response) => {
    const medicineData = req.body;
    const newMedicine = await medicineServices.createMedicine(medicineData);
    return returnRes(res,201,"Created",newMedicine);
  });

   update = asyncError(async(req: Request, res: Response)=> {
    const updated = await medicineServices.updateMedicine(req.params.id, req.body);
    if (!updated) {
      return returnRes(res,404,"Not found medicine");
    }
    return returnRes(res,200,"Updated",updated);
  });

   delete = asyncError(async(req: Request, res: Response) => {
    const deleted = await medicineServices.deleteMedicine(req.params.id);
    if (!deleted) {
      return returnRes(res,404,"Not found");
    }
    return returnRes(res,200,"Deleted Medicine",deleted)
  });

  filterMedicine = asyncError(async (req: Request, res: Response) => {
    const { name, categoryId, indications } = req.query;
  
    const medicines = await medicineServices.searchMedicince({
      name: name as string,
      categoryId: categoryId as string,
      indications: indications as string,
    });
  
    console.log('a'); // Sẽ chạy nếu không lỗi
  
    return res.status(200).json({ success: true, data: medicines });
  });


  searchMed = asyncError(async(req:Request,res:Response)=>{
    try {
      const { name } = req.query;
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Search query is required' });
      }
      const results = await medicineServices.searchMed(name);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
}
export default new MedicineController();
