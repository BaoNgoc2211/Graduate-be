// config/index.ts
interface IConfig {
  jwt: {
    secret: string;
    expiresIn: string;
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
