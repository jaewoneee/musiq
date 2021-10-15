var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var usersRouter = require("./routes/users");
var listRouter = require("./routes/playlist");
var musicRouter = require("./routes/music");

// Utils
var auth = require('./utils/auth');

var app = express();

// Session
app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store : new MySQLStore({
    host:'localhost',
    port:3306,
    user:'root',
    password:'qlrqod12',
    database:'vue_db'
  })
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/api/users', usersRouter);
app.use('/api/main', listRouter);
// app.use("/api/search", auth.authUser, musicRouter);
app.use("/api/search", musicRouter);

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
