const { ServerError } = require("../lib/ErrorHandler");
const { HttpStatus, STATUS_MAP_MESSAGE } = require("../constants");

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data, { convert: false });
  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      return {
        error: value.message,
        path: value.path,
      };
    });
    return errorDetails;
  }
  return null;
};

module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.body, schema);
    if (error) {
      next(
        new ServerError(
          HttpStatus.BAD_REQUEST,
          STATUS_MAP_MESSAGE[HttpStatus.BAD_REQUEST],
          error
        )
      );
    }
    return next();
  };
};

module.exports.validateQuerryParams = (schema) => {
  return (req, res, next) => {
    const error = validateObjectSchema(req.query, schema);
    if (error) {
      next(
        new ServerError(
          HttpStatus.BAD_REQUEST,
          STATUS_MAP_MESSAGE[HttpStatus.BAD_REQUEST],
          error
        )
      );
    }
    return next();
  };
};