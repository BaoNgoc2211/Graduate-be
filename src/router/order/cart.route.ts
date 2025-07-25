import express from "express";
import cartController from "../../controller/order/cart.controller";
import { protect } from "../../middleware/auth.middleware";
const router = express.Router();
router.get("/get-cart", protect, cartController.getAll);
router.post("/add-item", protect, cartController.addToCart);
router.patch("/update/", protect, cartController.update);
router.delete("/remove/:id", protect, cartController.remove);
router.delete("/clear", protect, cartController.clear);

export default router;
