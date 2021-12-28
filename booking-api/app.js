const c = console;
require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var authintcationRouter = require("./routes/authintcation");
var buyersRouter = require("./routes/buyers");
var sellersRouter = require("./routes/sellers");
var usersRouter = require("./routes/users");
var errorRouter = require("./routes/error");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", indexRouter);
app.use("/auth", authintcationRouter);
app.use("/buyers", buyersRouter);
app.use("/sellers", sellersRouter);
app.use("/users", usersRouter);
app.use("/error", errorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // c.log(err);
  //res.status(err.status || 500);
  res.redirect("/error");
});

module.exports = app;
