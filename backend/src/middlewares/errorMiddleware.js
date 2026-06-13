const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  const responseMessage = statusCode === 500 && isProduction
    ? "Internal Server Error"
    : err.message || "Internal Server Error";

  res.status(statusCode).json({
    message: responseMessage,
  });
};

export default errorMiddleware;