import bcrypt from "bcrypt";

class Bcrypt {
  async Hash(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async Compare(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}

export default new Bcrypt();
