import asyncError from "../middleware/error.middleware";
import { returnRes } from "../util/response";
import { Request, Response } from "express";
import shippingService from "../service/shipping.services";

class ShippingController {
    getAllShipping = asyncError(async (req: Request,res:Response) => {
        const shipping = await shippingService.getAllShippingMethods();
        returnRes(res, 200, "Get All Shipping", shipping);
    });
    getShippingById = asyncError(async (req: Request, res: Response) => {
        const shipping = await shippingService.getShippingMethodById(req.params.id);
        returnRes(res, 200, "Get Shipping By ID", shipping!);
    });
    createShipping = asyncError(async (req: Request, res: Response) => {
        const shipping = await shippingService.createShippingMethod(req.body);
        returnRes(res, 201, "Created Shipping Method", shipping);
    });
    updateShipping = asyncError(async (req: Request, res: Response) => {
        const shipping = await shippingService.updateShippingMethod(req.params.id, req.body);
        returnRes(res, 200, "Updated Shipping Method", shipping!);
    });
    deleteShipping = asyncError(async (req: Request, res: Response) => {
        const shipping = await shippingService.deleteShippingMethod(req.params.id);
        returnRes(res, 200, "Deleted Shipping Method", shipping!);
    });
}
const shippingController = new ShippingController();
export default shippingController;