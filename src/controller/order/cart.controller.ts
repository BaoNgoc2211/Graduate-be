import asyncError from "../../middleware/error.middleware";
import { Response, Request } from "express";
import { returnRes } from "../../util/response";
import cartService from "../../service/order/cart.services";
class CartController {
  getAll = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const data = await cartService.getAll(String(userId!));

    returnRes(res, 200, "Get cart items successful", data!);
  });
  addToCart = asyncError(async (req: Request, res: Response) => {
    const userId = req.user!;
    const { medicine_id, quantity } = req.body;
    const data = await cartService.addToCart(
      String(userId),
      medicine_id,
      quantity
    );

    returnRes(res, 200, "Add item to cart successful", data!);
  });
  update = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const { medicine_id, quantity } = req.body;
    const data = await cartService.update(
      String(userId!),
      medicine_id,
      quantity
    );
    returnRes(res, 200, "Update cart successful", data!);
  });
  remove = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const { medicine_id } = req.body;
    const data = await cartService.removeItem(String(userId!), medicine_id);
    returnRes(res, 200, "Remove item from cart successful", data!);
  });
  clear = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const data = await cartService.clearCart(String(userId!));
    returnRes(res, 200, "Clear cart successful", data!);
  });
}
const cartController = new CartController();
export default cartController;
