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

router.get("/:id", productController.getProductById);

router.put(
  "/:id",
  joiSchemaValidation.validateBody(productSchema.updateProductSchema),
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
