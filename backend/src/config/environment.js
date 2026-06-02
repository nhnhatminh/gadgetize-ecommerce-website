const environment = {
  db: {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432", 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

if (!environment.db.password) {
  console.error("====================================================================");
  console.error("CRITICAL ERROR: 'DB_PASSWORD' is not defined in the .env file.");
  console.error("The application will shut down to prevent configuration corruption.");
  console.error("====================================================================");
  process.exit(1);
}

export default environment;