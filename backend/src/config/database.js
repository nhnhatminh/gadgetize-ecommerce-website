import pg from "pg";
import environment from "./environment.js";

const { Pool } = pg;

const pool = new Pool({
  user: environment.db.user,
  host: environment.db.host,
  database: environment.db.name,
  password: environment.db.password,
  port: environment.db.port,
});

export default pool;