// routes/cartDetail.route.ts
import { Router } from "express";
import orderDetailController from "../controller/order/order-detail.controller";
import orderController from "../controller/order/order.controller";
// import cartDetailController from "../controller/order/cart-detail.controller";
const router = Router();

//orderdetail
router.post("/orderdetail/", orderDetailController.create);
router.get("/orderdetail/", orderDetailController.getAll);
router.get("/orderdetail/:id", orderDetailController.getById);
// router.get("/user/:userId", orderDetailController.getByUserId);
router.put("/orderdetail/:id", orderDetailController.update);
router.delete("orderdetail/:id", orderDetailController.delete);


//order
router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
// router.get("/user/:userId", orderDetailController.getByUserId);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);




export default router;
