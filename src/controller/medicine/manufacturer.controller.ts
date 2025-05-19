import { Response, Request } from "express";
import asyncError from "../../middleware/error.middleware";
import manufacturerServices from "../../service/medicine/manufacturer.services";
import { returnRes } from "../../util/response";
class ManufacturerController {
  addManufacturer = asyncError(async (req: Request, res: Response) => {
    const data = await manufacturerServices.addManufacturer(req.body);
    returnRes(res, 200, "Add Manufacturer Successful");
  });
}
const manufacturerController = new ManufacturerController();
export default manufacturerController;
