// config/index.ts
import { SignOptions } from 'jsonwebtoken';

interface IConfig {
  jwt: {
    secret: string;
    expiresIn: SignOptions['expiresIn'];
  };
  email: {
    user: string;
    pass: string;
  };
}

const config: IConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "7d"
  },
  email: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || ""
  }
};

export default config;
