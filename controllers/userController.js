const userServices = require("../services/userServices");
const jwt = require('jsonwebtoken');
const { HttpStatus, STATUS_MAP_MESSAGE, userMessage } = require("../constants");
const { ServerError } = require("../lib/ErrorHandler");

module.exports.signup = async (req, res, next) => {
  try {
    const userCreated = await userServices.signup(req.body);
    return res.status(HttpStatus.CREATED).json({
      message: userMessage.SIGNUP_SUCCESS,
      user: userCreated,
      sucess: true,
    });
  } catch (err) {
    next(
      new ServerError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        err.message,
        err.stack
      )
    );
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const userCreated = await userServices.login(req.body);
    return res.status(HttpStatus.CREATED).json({
      message: userMessage.LOGIN_SUCCESS,
      user: userCreated,
      sucess: true,
    });
  } catch (err) {
    next(
      new ServerError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        err.message,
        err.stack
      )
    );
  }
};

