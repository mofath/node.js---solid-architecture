const productService = require("../services/productServices");
const {
  HttpStatus,
  STATUS_MAP_MESSAGE,
  productMessage,
} = require("../constants");
const { ServerError } = require("../lib/ErrorHandler");

module.exports.createProduct = async (req, res, next) => {
  try {
    const result = await productService.createProduct(req.body);
    return res.status(HttpStatus.CREATED).json({
      message: productMessage.PRODUCT_CREATED,
      product: result.toObject(),
      sucess: true,
    });
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

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getAllProducts(req.query);
    return res.status(HttpStatus.OK).json({
      message: productMessage.PRODUCT_FETCHED,
      product: result,
      sucess: true,
    });
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

module.exports.getProductById = async (req, res, next) => {
  try {
    const result = await productService.getProductById(req.params);
    return res.status(HttpStatus.OK).json({
      message: productMessage.PRODUCT_FETCHED,
      product: result,
      sucess: true,
    });
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


