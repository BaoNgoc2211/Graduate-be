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
  // getAll = asyncError(async (req: Request, res: Response) => {
  //   const userId = req.user?.userId;
  
  //   if (!userId) {
  //     returnRes(res, 401, "Unauthorized: User ID missing");
  //     return;
  //   }
  
  //   const data = await cartService.getAll(userId);
  //   returnRes(res, 200, "Get cart items successful", data);
  // });
  addToCart = asyncError(async (req: Request, res: Response) => {
    const userId = req.user!; // sau middleware auth
    const data = await cartService.addToCart(String(userId), req.body);
    returnRes(res, 200, "Add item to cart successful", data!);
  });
}
const cartController = new CartController();
export default cartController;
