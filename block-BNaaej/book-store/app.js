const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/book-store", (err) => {
  console.log(err ? err : "database true");
});

const v1bookRouter = require("./routes/book_v1");
const v2bookRouter = require("./routes/book_v2");
const v2commentRouter = require("./routes/comments_v2");
const v3bookRouter = require("./routes/book_v3");
const v3commentRouter = require("./routes/comments_v3");
const v3categoryRouter = require("./routes/category_v3");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/books", v1bookRouter);
app.use("/api/v2/books", v2bookRouter);
app.use("/api/v2/comments", v2commentRouter);
app.use("/api/v3/books", v3bookRouter);
app.use("/api/v3/comments", v3commentRouter);
app.use("/api/v3/category", v3categoryRouter);

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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;