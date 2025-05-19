import mongoose from "mongoose";
import { DetailedDosageFormEnum } from "../../enum/medicine/medicine.enum";

// export interface IMedicine {
//   code?: string;
//   name: string;
//   thumbnail?: string;
//   image: string[];
//   packaging: string;
//   dosageForm: DetailedDosageFormEnum;
//   dosage?: string;
//   soldQuantity?: number;
//   stockQuantity: number;
//   usageInstruction: string;
//   indication?: string;
//   side_Effect?: string;
//   contraindication?: string;
//   precaution?: string;
//   ability?: string;
//   pregnacy?: string;
//   drug_Interaction?: string;
//   preserve?: string;
//   active?: string;
//   med_CategoryId: mongoose.Types.ObjectId[];
//   med_
// }

export interface IReview {
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  medicine_id: mongoose.Types.ObjectId;
}
export interface IMedicine {
  code: string;
  name: string;
  thumbnail: string;
  image?: string[];
  packaging: string;
  dosageForm: DetailedDosageFormEnum;
  stockQuantity: number;
  use: string; // cách dùng
  dosage?: string; // liều dùng
  indication?: string; // công dụng
  adverse?: string; // tác dụng phụ
  contraindication?: string; // chống chỉ định
  precaution?: string; // thận trọng khi sử dụng
  ability?: string; //Khả năng lái xe và vận hành máy móc
  pregnancy?: string; // Thời kỳ mang thai và cho con bú
  drugInteractions?: string; // Tương tác thuốc
  storage: string; // bảo quản
  active: string;
  age_group: mongoose.Types.ObjectId[];
  medCategory_id: mongoose.Types.ObjectId[];
  medUsage_id: mongoose.Types.ObjectId[];
  manufacturer_id: mongoose.Types.ObjectId;
}
