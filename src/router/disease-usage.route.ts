import express from "express";
import controller from "../controller/disease/disease-usage.controller";
const router = express.Router();

router.post("/add-disUsage", controller.addDisUsage);
router.put("/edit-disUsage/:id", controller.editDisUsage);
router.delete("/delete-disUsage/:id", controller.deleteDisUsage);
router.get("/get-disUsage", controller.addDisUsage);
export default router;
