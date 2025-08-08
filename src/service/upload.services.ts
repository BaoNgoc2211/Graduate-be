import { v2 as cloudinary } from "cloudinary";
import { IUpload } from "../interface/upload.interface";
import Tesseract from "tesseract.js";
import sharp from "sharp";
import fs from "fs/promises";

export interface IMedicienPrescription{
  medicineName: string,
  quantity:  number,
  unit: string,
}

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
  async uploadPrescription(imagePath: string): Promise<IMedicienPrescription[]> {
    // Tạo đường dẫn ảnh tạm sau khi xử lý
    const processedImagePath = imagePath.replace(/(\.\w+)$/, '_processed$1');

    // Xử lý ảnh bằng Sharp
    await sharp(imagePath)
      .resize({ width: 1000 })            // resize ảnh về kích thước tiêu chuẩn
      .grayscale()                         // chuyển sang ảnh đen trắng
      .normalize()                         // tăng tương phản, làm rõ nét         
      .threshold(150)                      // nhị phân hóa ảnh (giảm nhiễu)
      .toFile(processedImagePath);
    // OCR bằng Tesseract
    const ocrResult = await Tesseract.recognize(processedImagePath, 'eng+vie');
    const rawText = ocrResult.data.text;

    // Xóa ảnh tạm sau xử lý
    await fs.unlink(processedImagePath);

    // Trích xuất thuốc
    return this.extractMedicines(rawText);
  }
  private extractMedicines(text: string): IMedicienPrescription[] {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const result: IMedicienPrescription[] = [];

    // Từ điển sửa lỗi chính tả OCR
    const unitMap: Record<string, string> = {
      'vien': 'viên',
      'vién': 'viên',
      'viem': 'viên',
      'gói': 'gói',
      'goi': 'gói',
      'chai': 'chai',
      'chal': 'chai',
      'ống': 'ống',
      'ong': 'ống',
      'ông': 'ống',
      'tuyp': 'tuýp',
      'tuýp': 'tuýp'
    };

    for (let line of lines) {
    // Bước 1: Làm sạch dòng
    line = line.replace(/(\d)([^\d\s]+)/g, '$1 $2'); // thêm khoảng cách giữa số & chữ
    line = line.replace(/^\s*\d+[.:]?\s*/, '');       // loại bỏ số thứ tự đầu dòng

    const match = line.match(/^(.+?)\s+(\d+)\s*(\S+)?$/i);

    if (match) {
      let medicineName = match[1].trim().replace(/^\.?\s*/, ''); // xóa dấu chấm đầu dòng
      medicineName = medicineName.replace(/([a-zA-Z])(\d)/g, '$1 $2'); // chèn khoảng trắng tên và số

      const quantity = Number(match[2]);
      const rawUnit = match[3].toLowerCase()||"";
      const unit = unitMap[rawUnit] ||"";

      result.push({ medicineName, quantity, unit });
    }
  }

    return result;
  }
    
}
const uploadService = new UploadServices();
export default uploadService;
