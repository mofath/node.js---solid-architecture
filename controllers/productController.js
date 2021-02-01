const productService = require("../services/productServices");
const {
  HttpStatus,
  STATUS_MAP_MESSAGE,
  productMessage,
} = require("../constants");
const { ServerError } = require("../lib/ErrorHandler");

module.exports.createProduct = async (req, res, next) => {
  try {
    await productService.createProduct(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: productMessage.PRODUCT_CREATED, sucess: true });
  } catch (err) {
    console.log(err.message);
    next(
      new ServerError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        STATUS_MAP_MESSAGE[HttpStatus.INTERNAL_SERVER_ERROR],
        err.stack
      )
    );
  }
};
