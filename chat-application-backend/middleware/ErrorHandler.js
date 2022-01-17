import ErrorResponse from "../utils/ErrorResponse.js"

const errorHandler = (err, request, response, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.code === 11000) {
    const message = "Email Already Exist";
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  response.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler