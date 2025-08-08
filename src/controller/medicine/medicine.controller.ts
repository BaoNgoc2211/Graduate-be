import { Request, Response } from "express";
import medicineServices from "../../service/medicine/medicine.services";
import asyncError from "../../middleware/error.middleware";
import { returnRes } from "../../util/response";

class MedicineController {
  getMedicineAdmin = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const medicines = await medicineServices.getMedicineAdmin(page,limit);
    returnRes(res, 200, "Medicine", medicines);
  });
  getMedicineUser = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const medicines = await medicineServices.getMedicineUser(page,limit);
    returnRes(res, 200, "Medicine:", medicines);
  });
  getCreateAdd = asyncError(async (req: Request, res: Response) => {
    try {
      const result = await medicineServices.getMedByCreatedDate();
      returnRes(res, 200, "Fetch last 30 days medicines", result);
    } catch (error) {
      console.error("Error in getRecentMedicines:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  getById = asyncError(async (req: Request, res: Response) => {
    const medicineId = await medicineServices.getMedicineById(req.params.id);
    returnRes(res, 200, "Get Id Medicine", medicineId!);
  });

  create = asyncError(async (req: Request, res: Response) => {
    const newMedicine = await medicineServices.createMedicine(req.body);
    returnRes(res, 201, "Created Medicine", newMedicine);
  });

  update = asyncError(async (req: Request, res: Response) => {
    const updated = await medicineServices.updateMedicine(
      req.params.id,
      req.body
    );
    returnRes(res, 200, "Updated Medicine", updated!);
  });

  delete = asyncError(async (req: Request, res: Response) => {
    const deleted = await medicineServices.deleteMedicine(req.params.id);
    returnRes(res, 200, "Deleted Medicine", deleted!);
  });

  // filterMedicine = asyncError(async (req: Request, res: Response) => {
  //   const { name, categoryId, indications } = req.query;

  //   const medicines = await medicineServices.searchMedicince({
  //     name: name as string,
  //     categoryId: categoryId as string,
  //     indications: indications as string,
  //   });

  //   return res.status(200).json({ success: true, data: medicines });
  // });

  searchMed = asyncError(async (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      if (!name || typeof name !== "string") {
         res.status(400).json({ message: "Search query is required" });
      }
      const results = await medicineServices.searchMed(name as string);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
}
export default new MedicineController();
