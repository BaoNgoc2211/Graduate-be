import { v2 as cloudinary } from "cloudinary";
import { IUpload } from "../interface/upload.interface";
import Tesseract from "tesseract.js";

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
  async uploadPrescription(image: string): Promise<IMedicienPrescription[]> {
    const ocrResult = await Tesseract.recognize(image, 'vie');
    const rawText = ocrResult.data.text;
    return this.extractMedicines(rawText);
  }

  private extractMedicines(text: string): IMedicienPrescription[] {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const result: IMedicienPrescription[] = [];
    // console.log('Extracted lines:', lines);
    console.log('Raw text:', text);
    for (const line of lines) {
      // console.log('Line:', line);
      // const match = line.match(/^\d+\.\s*(.+?)\s+(\d+)\s*(viên|gói|chai|ống)?/i);
      const match = line.match(/^(?:\d+\.\s*)?(.+?)\s+(\d+)\s*(viên|gói|chai|ống)?/i);
      if (match) {
        result.push({
          medicineName: match[1].trim(),
          quantity: Number(match[2]),
          unit: match[3]?.toLowerCase() || '',
        });
      }
      // console.log(medicineName, quantity, unit);,
    }
    
    return result;
  }
}


const uploadService = new UploadServices();
export default uploadService;
