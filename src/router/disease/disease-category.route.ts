import express from "express";
import controller from "../../controller/disease/disease-category.controller";
import { protect } from "../../middleware/auth.middleware";
const router = express.Router();
router.get("/getAll", controller.getAll);
router.get("/:id", controller.getById);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
export default router;
