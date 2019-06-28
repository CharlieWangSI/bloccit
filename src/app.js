const express = require("express");
const app = express();
const appConfig = require("./config/main-config.js");

const routeConfig = require("./config/route-config.js");
// const ejslint= require("ejs-lint");
const view = require("./views/static/index.ejs");
// console.log("linting view");
// ejslint.lint(view);
// console.log("linted");
 appConfig.init(app, express);
 routeConfig.init(app);

module.exports = app;
