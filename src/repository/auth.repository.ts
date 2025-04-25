import { IUser } from "../interface/user.interface";
import User from "../model/user.model";

class AuthRepository {
  async findEmail(email: string) {
    return await User.findOne({ email });
  }
  async createUser(user: IUser) {
    return await User.create(user);
  }
  async verifyUser(email: string) {
    return await User.findByIdAndUpdate({
      email,
      isEmailVerified: true,
    });
  }
}
export default new AuthRepository();
