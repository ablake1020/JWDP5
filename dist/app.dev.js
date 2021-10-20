"use strict";

var express = require('express');

var path = require('path');

var cameraRoutes = require('./routes/camera');

var app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/images', express["static"](path.join(__dirname, 'images')));
app.use(express["static"]('images'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/api/cameras', cameraRoutes);
module.exports = app;