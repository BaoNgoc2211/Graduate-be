import express from "express";
import medicineCateController from "../controller/medicine/medicine-category.controller";
import medicineController from "../controller/medicine/medicine.controller";
import medicineUsageGroup from "../controller/medicine/medicine-usage.controller";
const router = express.Router();

router.get("/cate", medicineCateController.getAll);
router.get("/cate/:id", medicineCateController.getById);
router.post("/cate/", medicineCateController.create);
router.put("/cate/:id", medicineCateController.update);
router.delete("/cate/:id", medicineCateController.delete);

router.get("/usage", medicineUsageGroup.getAll);
router.get("/usage/:id", medicineUsageGroup.getById);
router.post("/usage/add", medicineUsageGroup.addMedUsage);
router.put("/usage/edit/:id", medicineUsageGroup.editMedUsage);
router.delete("/usage/remove/:id", medicineUsageGroup.deleteMedUsage);

router.get("/", medicineController.getAll);
router.get("/search", medicineController.searchMed);
router.get("/filter", medicineController.filterMedicine);
router.get("/createdAdd", medicineController.getCreateAdd);
router.get("/:id", medicineController.getById);
router.post("/", medicineController.create);
router.put("/:id", medicineController.update);
router.delete("/:id", medicineController.delete);



export default router;
