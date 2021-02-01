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
