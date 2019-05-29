const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

// initialize express
const app = express();

// set up console logging
app.use(morgan("tiny"));

// to parse json request bodies
app.use(bodyParser.json());
//Parse URL codes
app.use(bodyParser.urlencoded({ extended: false }));

// initialize Mongoose and models
require("./models");
const User = require("mongoose").model("User");
mongoose.connect("mongodb://localhost:27017/todoApp", { useNewUrlParser: true });

// set the view engine to ejs
app.set("view engine", "ejs");

// find static files (i.e. css) in views folder
app.use(express.static(__dirname + "/views"));

// initialize routes
// NOTE: you have to do this after you initialize your models
app.use(require("./routes"));

//start up server
app.listen("8080");
