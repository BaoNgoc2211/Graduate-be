import express from "express";
import controller from "../../controller/order/cart.controller";
const router = express.Router();
router.post("/create", controller.addToCart);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.get("/getAll", controller.getAll);
router.post("/add-item", controller.addToCart);
export default router;
