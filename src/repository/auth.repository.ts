import { IUser } from "../interface/auth/user.interface";
import User from "../model/auth/user.model";

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
  async findByGoogleId(googleId: string): Promise<IUser | null> {
    return User.findOne({ googleId });
  }

  async createGoogleUser(user: Partial<IUser>): Promise<IUser> {
    const newUser = new User(user);
    return newUser.save();
  }
}
export default new AuthRepository();
