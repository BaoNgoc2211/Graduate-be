"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.riskGroup = exports.SeverityEnum = exports.StageEnum = void 0;
exports.StageEnum = {
    INCUBATION: "Ủ bệnh",
    PRODROMAL: "Khởi phát",
    ACUTE: "Toàn phát",
    RECOVERY: "Phục hồi",
};
exports.SeverityEnum = {
    MILD: "Nhẹ",
    MODERATE: "Trung bình",
    SEVERE: "Nặng",
    VERY_SEVERE: "Rất nặng",
    FATAL: "Tử vong",
};
exports.riskGroup = {
    INFANT: "Nhũ nhi",
    TODDLER: "Trẻ nhỏ",
    PRESCHOOL_CHILD: "Trẻ mẫu giáo",
    CHILD: "Trẻ em",
    ADOLESCENT: "Thiếu niên",
    ADULT: "Người trưởng thành",
    ELDERLY: "Người cao tuổi",
};
