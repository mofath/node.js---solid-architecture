const productMessage = {
  PRODUCT_CREATED: "Product Created Successfully",
  PRODUCT_FETCHED: "Product Fetched Successfully",
  PRODUCT_UPDATED: "Product Updated Successfully",
  PRODUCT_DELETED: "Product Deleted Successfully",
  PRODUCT_NOT_FOUND: "Product Not Found",
};
const userMessage = {
  SIGNUP_SUCCESS: "Signup Success",
  LOGIN_SUCCESS: "Login Success",
  DUPLICATE_EMAIL: "User already exist with given email",
  USER_NOT_FOUND: "User not found",
  INVALID_PASSWORD: "Incorrect Password",
};
const requestValidationMessage = {
  BAD_REQUEST: "Invalid fields",
  TOKEN_MISSING: "Token missing from header",
};
const databaseMessage = {
  INVALID_ID: "Invalid Id",
};

module.exports = {
  databaseMessage,
  productMessage,
  requestValidationMessage,
  userMessage,
};
