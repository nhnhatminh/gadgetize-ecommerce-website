const errorMiddleware = (err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === "23505") {
    statusCode = 400;
    message = "Data already exists in the system.";
  } else if (err.code === "23503") {
    statusCode = 400;
    message = "Referenced resource does not exist.";
  }

  const isProduction = process.env.NODE_ENV === "production";
  const responseMessage = statusCode === 500 && isProduction
    ? "Internal Server Error"
    : message;

  res.status(statusCode).json({
    message: responseMessage,
  });
};

export default errorMiddleware;