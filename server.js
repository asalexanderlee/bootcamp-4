const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const env = require("dotenv").config();

// initialize express
const app = express();

app.use(bodyParser.json());
//Parse URL codes
app.use(bodyParser.urlencoded({ extended: false }));

// set up console logging
app.use(morgan("tiny"));

// initialize Mongoose and models
require("./models");
mongoose.connect("mongodb://localhost:27017/todoApp", { useNewUrlParser: true });

require("./cron");

// initialize routes
// NOTE: you have to do this after you initialize your models
app.use(require("./routes"));

//start up server
app.listen("8080");
