"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../model/auth/user.model"));
class AuthRepository {
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ email });
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.create(user);
        });
    }
    verifyUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findByIdAndUpdate({
                email,
                isEmailVerified: true,
            });
        });
    }
    findByGoogleId(googleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findOne({ googleId });
        });
    }
    createGoogleUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new user_model_1.default(user);
            return newUser.save();
        });
    }
}
exports.default = new AuthRepository();
