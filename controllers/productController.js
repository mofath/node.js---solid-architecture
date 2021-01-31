var productService = require("../services/productServices");

module.exports.createProduct = async (req, res) => {
  let response = {};
  try {
    await productService.createProduct(req.body);
    response.status = 200;
    response.message = "created";
  } catch (error) {
    console.log("Something went wrong: Controller: createProduct", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response.message);
};
