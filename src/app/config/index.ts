import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
  port:  process.env.PORT,
  database_url: process.env.DATABASE_URI,
  jwt_access_secret : process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret : process.env.JWT_REFRESH_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  sp_endpoint: process.env.SP_ENDPOINT,
  sp_username: process.env.SP_USERNAME,
  sp_password: process.env.SP_PASSWORD,
  sp_prefix: process.env.SP_PREFIX,
  sp_return_url: process.env.SP_RETURN_URL,
}