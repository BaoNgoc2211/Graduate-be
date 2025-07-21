import { Response, Request } from "express";
import asyncError from "../../middleware/error.middleware";
import manufacturerServices from "../../service/inventory/manufacturer.services";
import { returnRes } from "../../util/response";
class ManufacturerController {
  addManufacturer = asyncError(async (req: Request, res: Response) => {
    const data = await manufacturerServices.addManufacturer(req.body);
    returnRes(res, 200, "Add Manufacturer Successful",data);
  });
  getManufacturerById = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await manufacturerServices.getManufacturerById(id);
    returnRes(res, 200, "Get Manufacturer By Id Successful", data!);
  });
  getAllManufacturers = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string )||10;
    const data = await manufacturerServices.getAllManufacturers(page, limit);
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
