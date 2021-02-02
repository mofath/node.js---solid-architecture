const ProductModel = require("../models/productModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const { productMessage } = require("../constants");

module.exports.createProduct = async (serviceData) => {
  try {
    const product = new ProductModel({
      name: serviceData.name,
      price: serviceData.price,
      brand: serviceData.brand,
    });
    const result = await product.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createProduct", error);
    throw new Error(error);
  }
};

module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
  try {
    const result = await ProductModel.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: getAllProducts", error);
    throw new Error(error);
  }
};

module.exports.getProductById = async ({ id }) => {
  try {
    checkObjectId(id);
    const result = await ProductModel.findById(id);
    if (!result) throw new Error(productMessage.PRODUCT_NOT_FOUND);
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: getProductById", error);
    throw new Error(error);
  }
};
