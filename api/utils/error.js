export const errorHandler = (statusCode, message) => {
  // for user defined errors
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
