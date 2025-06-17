import asyncError from "../../middleware/error.middleware";
import { Response, Request } from "express";
import { returnRes } from "../../util/response";
import cartService from "../../service/order/cart.services";
class CartController {
  create = asyncError(async (req: Request, res: Response) => {
    const data = await cartService.create(req.body);
    returnRes(res, 200, "Add Product On Cart Successful", data!);
  });
  update = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await cartService.update(id, req.body);
    returnRes(res, 200, "Edit Product successful", data!);
  });
  delete = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await cartService.delete(id);
    returnRes(res, 200, "Delete Product successful", data!);
  });
  getAll = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    console.log(userId);
    if (!userId) {
      returnRes(res, 401, "Unauthorized: User ID missing");
      return;
    }
    returnRes(res, 200, "Get cart items successful");
  });
  // addToCart = asyncError(async (req: Request, res: Response) => {
  //   // const userId = req.user as string;
  //   console.log("Request Body:", req.body);
  //   const { user_id, medicine_item } = req.body;
  //   // Check if medicine_item is an array and has at least one item
  //   if (
  //     !user_id ||
  //     !Array.isArray(medicine_item) ||
  //     medicine_item.length === 0
  //   ) {
  //     return res.status(400).json({ message: "Missing required fields" });
  //   }
  //   for (const item of medicine_item) {
  //     if (!item.medicine_id || !item.quantity || item.quantity <= 0) {
  //       return res.status(400).json({
  //         message: "Each item must have valid medicine_id and quantity > 0",
  //       });
  //     }
  //   }
  //   const result = await cartService.addToCart(user_id, medicine_item);
  //   returnRes(res, 200, "Add item to cart successful", result);
  // });
  addToCart = asyncError(async (req: Request, res: Response) => {
    const userId = req.user!;
    const { medicine_id, quantity = 1 } = req.body;
    const data = await cartService.addToCart(
      String(userId),
      medicine_id,
      quantity
    );
    console.log(userId);
    returnRes(res, 200, "Add item to cart successful", data!);
  });
}
const cartController = new CartController();
export default cartController;
