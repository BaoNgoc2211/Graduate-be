import mongoose from "mongoose";
import { ICD10Model } from "../model/icd10.model";
import { readFileSync } from "fs";
const icd10Data = JSON.parse(readFileSync("src/databases/icd10.json", "utf8"));
// Kết nối đến MongoDB
mongoose
  .connect("medigo.jpjxlcz.mongodb.net")
  .then(async () => {
    console.log("Connected to MongoDB")

    // Xoá dữ liệu cũ nếu có
    await ICD10Model.deleteMany({});

    // Thêm dữ liệu mới
    await ICD10Model.insertMany(icd10Data);
    console.log("✅ Đã thêm dữ liệu ICD-10 thành công");

    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Kết nối MongoDB thất bại", err);
    process.exit(1);
  });
