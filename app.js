const express = require("express");
const { NotFoundError } = require("./lib/ErrorHandler");

const app = express();

// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

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
    console.log(err.message);
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
