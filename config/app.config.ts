import dotenv from "dotenv";
dotenv.config();

const appConfig = () => ({
  PORT: process.env.PORT,
});
export default appConfig();
