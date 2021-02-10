const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const { NotFoundError } = require("./lib/ErrorHandler");
const { accessLog, errorLog } = require("./lib/logger");

const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a request logging middleware in development mode
if (app.get("env") === "development") {
  app.use((req, res, next) => {
    accessLog.info(`${req.method}: ${req.url}`);
    return next();
  });
}

app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

// API documentation
app.use("/api-docs/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new NotFoundError());
});

/**
 *  error handlers
 */

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    errorLog.error(err.message);
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      stack: err.stack,
      success: false,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    stack: {},
    success: false,
  });
});

module.exports = app;
