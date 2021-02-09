const { HttpStatus, STATUS_MAP_MESSAGE } = require("../constants");

class ServerError extends Error {
  constructor(status, message, stack = "") {
    super(message, stack);
    this.status = status;
  }
}

class NotFoundError extends ServerError {
  constructor(
    status = HttpStatus.NOT_FOUND,
    message = STATUS_MAP_MESSAGE[HttpStatus.NOT_FOUND],
    stack = ""
  ) {
    super(status, message, stack);
  }
}

module.exports = {
  ServerError,
  NotFoundError,
};
