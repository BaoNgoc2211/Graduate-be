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
      .resize(1000) // resize cho đồng đều
      .grayscale() // chuyển ảnh sang đen trắng
      .sharpen()   // làm nét
      .normalize() // tăng độ tương phản
      .toFile(processedImagePath);

    // OCR bằng Tesseract
    const ocrResult = await Tesseract.recognize(processedImagePath, 'eng+vie');
    const rawText = ocrResult.data.text;

    // Xóa ảnh tạm sau xử lý
    await fs.unlink(processedImagePath);

    // Trích xuất thuốc
    return this.extractMedicines(rawText);
  }
    // async uploadPrescription(image: string): Promise<IMedicienPrescription[]> {
    //   const ocrResult = await Tesseract.recognize(image, 'eng+vie', );
    //   const rawText = ocrResult.data.text;
    //   return this.extractMedicines(rawText);
    // }

    private extractMedicines(text: string): IMedicienPrescription[] {
      // const lines = text.split('\n').filter(line => line.trim() !== '');
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const result: IMedicienPrescription[] = [];
      console.log('Extracted lines:', lines);
      console.log('Raw text:', text);

      for (const line of lines) {
      const match = line.match(/^\s*[\w']*\s*(\d+)[.:]?\s*(.+?)\s+(\d+)\s*(viên|gói|chai|ống|ông)?\b/i);
        if (match) {
          const medicineName = match[2].trim().replace(/\s{2,}/g, ' ');
          result.push({
            medicineName,
            quantity: Number(match[3]),
            unit: match[4]?.toLowerCase() || '',
          });
        }
      }
    
      // for (const line of lines) {
      //   // console.log('Line:', line);
      //   const match = line.match(/(.+?)\s*[xX]\s*(\d+)\s*(viên|gói|chai|ống|tuýp)?/i);
      //   // const match = line.match(/^(?:\d+\.\s*)?(.+?)\s+(\d+)\s*(viên|gói|chai|ống)?/i);
      //   if (match) {
      //     result.push({
      //       medicineName: match[1].trim(),
      //       quantity: Number(match[2]),
      //       unit: match[3]?.toLowerCase() || '',
      //     });
      //   }
      //   // console.log(medicineName, quantity, unit);,
      // }
      
      return result;
    }
}
const uploadService = new UploadServices();
export default uploadService;
