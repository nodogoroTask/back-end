import dotenv from "dotenv";
const nodemailer = require("nodemailer");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (process.env.NODE_ENV === "development" && envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   *  Favorite port with 3005 as default
   */
  port: parseInt(process.env.PORT || "3001", 10),

  /**
   * That long string from mlab
   */
  databaseBaseURL:
    process.env.MONGODB_URI_BASE || "mongodb://localhost:270017/",

  /**
   * Name for database
   */
  databaseName: process.env.MONGODB_DATABASE_NAME || "nodogoro",

  /**
   * Your secret sauce
   */

  domain: process.env.DOMAIN,
  clientId: process.env.CLIENT_ID,
  audience: process.env.AUDIENCE,
  audienceV2: "https://dev-bn2ia9lj.us.auth0.com/api/v2/",
  appOrigin: process.env.APP_ORIGIN || "http://localhost:3000",
  apiOrigin: process.env.API_ORIGIN || "http://localhost:3001",
  secret: process.env.SECRET,
  grantType: "client_credentials",
  auth0endPoint: process.env.AUTH0_ENDPOINT,
  /**
   * API configs
   */

  api: {
    prefix: "/api",
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
