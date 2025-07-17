import express from "express";
import controller from "../../controller/disease/disease.controller";
const router = express.Router();

router.get("/",controller.getAllDiseases)
router.get("/detail/:id",controller.getDetail);
router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);

export default router;
