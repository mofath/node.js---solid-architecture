var ProductModel = require("../models/productModel");

module.exports.createProduct = async (serviceData) => {
  try {
    let product = new ProductModel({
      name: serviceData.name,
      price: serviceData.price,
      brand: serviceData.brand,
    });
    return await product.save();
  } catch (error) {
    console.log("Something went wrong: Service: createProduct", error);
    throw new Error(error);
  }
};

module.exports.getAllProducts = async () => {
  try {
    let products = await ProductModel.find({});
    return products;
  } catch (error) {
    console.log("Something went wrong: Service: getAllProducts", error);
    throw new Error(error);
  }
};
