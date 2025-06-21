import express from "express";
import middleware from "../middleware/upload.middleware";
import controller from "../controller/upload.controller";
const router = express.Router();
router.post(
  "/single",
  middleware.upload.single("image"),
  controller.uploadSingle
);
router.post(
  "/multiple",
  middleware.upload.array("image", 4),
  controller.uploadMultiple
);
router.post("/upload-precription",middleware.upload.single("image"),controller.uploadPrescription);
export default router;

