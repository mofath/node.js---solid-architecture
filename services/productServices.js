const ProductModel = require("../models/productModel");
const { formatMongoData } = require("../helpers/dbHelper");

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

module.exports.getAllProducts = async () => {
  try {
    const result = await ProductModel.find({});
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: getAllProducts", error);
    throw new Error(error);
  }
};
