import { ValidationError } from 'sequelize';
import CustomApiError from '../errors/CustomApiError';

const generateErrorResponse = (req, res, message, statusCode, errors = undefined) => {
  res.status(statusCode).json({
    message,
    statusCode,
    errors,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};

const handleCustomApiError = (err, req, res) => {
  generateErrorResponse(req, res, err.message, err.statusCode);
};

const handleValidationError = (err, req, res) => {
  const message = 'Validation error';
  const statusCode = 400;
  const errors = {};
  err.errors.forEach((error) => { errors[error.path] = error.message; });
  generateErrorResponse(req, res, message, statusCode, errors);
};

const handleInternalServerError = (req, res) => {
  const message = 'Internal Server Error';
  const statusCode = 500;
  generateErrorResponse(req, res, message, statusCode);
};

const handleJsonParseError = (req, res) => {
  const message = 'JSON parse error';
  const statusCode = 400;
  generateErrorResponse(req, res, message, statusCode);
};

export default (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return handleCustomApiError(err, req, res);
  }

  if (err instanceof ValidationError) {
    return handleValidationError(err, req, res);
  }

  if (err instanceof SyntaxError && err.statusCode === 400) {
    return handleJsonParseError(req, res);
  }
  console.error(err);
  handleInternalServerError(req, res);
  return next(err);
};
