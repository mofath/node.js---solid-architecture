const router = require("express").Router();
const productController = require("../controllers/productController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const productSchema = require("../apiSchema/productSchema");

router.post(
  "/",
  joiSchemaValidation.validateBody(productSchema.createProductSchema),
  productController.createProduct
);

router.get(
  "/",
  joiSchemaValidation.validateQuerryParams(productSchema.getAllProductSchema),
  productController.getAllProducts
);

module.exports = router;
