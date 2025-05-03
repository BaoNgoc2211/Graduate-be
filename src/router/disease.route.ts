import express from "express";
import controller from "../controller/disease/disease.controller";
const router = express.Router();
router.post("/add-disease", controller.addDisease);
router.put("/edit-disease", controller.editDisease);
