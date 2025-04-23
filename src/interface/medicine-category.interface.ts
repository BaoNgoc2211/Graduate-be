import { TherapeuticGroupEnum, typeEnum } from "../enum/medicine-cateogry.enum";
import { IMedicine } from "./medicine.interface";

export interface IMedicineCategory {
  code: string;
  name: TherapeuticGroupEnum;
  type: typeEnum[];
  medicine: IMedicine[];
}
