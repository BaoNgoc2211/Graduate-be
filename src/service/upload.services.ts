import { v2 as cloudinary } from "cloudinary";
import { IUpload } from "../interface/upload.interface";

class UploadServices implements IUpload {
  async uploadSingle(image: string) {
    const result = await cloudinary.uploader.upload(image, {
      folder: "medicine",
    });
    return result.secure_url;
  }
  async uploadMultiple(image: string[]): Promise<string[]> {
    const result = await Promise.all(
      image.map((img) =>
        cloudinary.uploader.upload(img, { folder: "medicine" })
      )
    );
    return result.map((rs) => rs.secure_url);
  }
}

const uploadService = new UploadServices();
export default uploadService;
