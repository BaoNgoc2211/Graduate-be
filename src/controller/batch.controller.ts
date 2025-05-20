// import { Request, Response } from "express";
// import asyncError from "../middleware/error.middleware";
// import batchServices from "../service/batch.services";
// import { returnRes } from "../util/response";

// class BatchController{
//     create = asyncError(async(req: Request, res:Response)=>{
//         const result = await batchServices.createBatch(req.body)
//         returnRes(res,201,"Created",result);
//     });
// }
// export default new BatchController;