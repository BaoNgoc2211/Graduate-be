import express from "express";
import cartController from "../../controller/order/cart.controller";
const router = express.Router();
router.post("/create", cartController.create);
router.put("/update/:id", cartController.update);
router.delete("/delete/:id", cartController.delete);
router.post("/add-item", cartController.addToCart);
export default router;
