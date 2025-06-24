import { Response, Request } from "express";
import asyncError from "../../middleware/error.middleware";
import manufacturerServices from "../../service/inventory/manufacturer.services";
import { returnRes } from "../../util/response";
class ManufacturerController {
  addManufacturer = asyncError(async (req: Request, res: Response) => {
    const data = await manufacturerServices.addManufacturer(req.body);
    returnRes(res, 200, "Add Manufacturer Successful",data);
  });
  getAllManufacturers = asyncError(async (req: Request, res: Response) => {
    const data = await manufacturerServices.getAllManufacturers();
    returnRes(res, 200, "Get All Manufacturers Successful", data);
  });
  updateManufacturer = asyncError(async (req: Request, res: Response) => {
    const data = await manufacturerServices.updateManufacturer(
      req.params.id,
      req.body
    );
    returnRes(res, 200, "Update Manufacturer Successful", data!);
  });
  deleteManufacturer = asyncError(async (req: Request, res: Response) => {
    await manufacturerServices.deleteManufacturer(req.params.id);
    returnRes(res, 200, "Delete Manufacturer Successful");
  });
}
const manufacturerController = new ManufacturerController();
export default manufacturerController;
