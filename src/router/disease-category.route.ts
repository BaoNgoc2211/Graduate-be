import express from "express";
import controller from "../controller/disease/disease-category.controller";
const router = express.Router();
router.post("/add-disCategory", controller.addDisCategory);
router.put("/edit-disCategory/:id", controller.editDisCategory);
router.delete("/delete-disCategory/:id", controller.deleteDisCategory);
router.get("/get-disCategory", controller.addDisCategory);
export default router;
