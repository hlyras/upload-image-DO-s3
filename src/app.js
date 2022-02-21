const express = require("express");
const path = require('path');
const morgan = require("morgan");

const app = express();

require('dotenv').config();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan("dev"));

app.use(require('./routes/index.routes'));

module.exports = app;