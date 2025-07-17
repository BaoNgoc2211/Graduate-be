import express from "express";
import controller from "../../controller/disease/disease-usage.controller";
const router = express.Router();

router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.get("/get-all", controller.getAll);

export default router;
