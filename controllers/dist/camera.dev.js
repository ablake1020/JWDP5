"use strict";

var uuid = require('uuid/v1');

var Camera = require('../models/Camera');

exports.getAllCameras = function (req, res, next) {
  Camera.find().then(function (cameras) {
    var mappedCameras = cameras.map(function (camera) {
      camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
      return camera;
    });
    res.status(200).json(mappedCameras);
  })["catch"](function () {
    res.status(500).send(new Error('Database error!'));
  });
};

exports.getOneCamera = function (req, res, next) {
  Camera.findById(req.params.id).then(function (camera) {
    if (!camera) {
      return res.status(404).send(new Error('Camera not found!'));
    }

    camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
    res.status(200).json(camera);
  })["catch"](function () {
    res.status(500).send(new Error('Database error!'));
  });
};
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */


exports.orderCameras = function (req, res, next) {
  if (!req.body.contact || !req.body.contact.firstName || !req.body.contact.lastName || !req.body.contact.address || !req.body.contact.city || !req.body.contact.email || !req.body.products) {
    return res.status(400).send(new Error('Bad request!'));
  }

  var queries = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var productId = _step.value;
      var queryPromise = new Promise(function (resolve, reject) {
        Camera.findById(productId).then(function (camera) {
          if (!camera) {
            reject('Camera not found: ' + productId);
          }

          camera.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + camera.imageUrl;
          resolve(camera);
        })["catch"](function () {
          reject('Database error!');
        });
      });
      queries.push(queryPromise);
    };

    for (var _iterator = req.body.products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  Promise.all(queries).then(function (cameras) {
    var orderId = uuid();
    return res.status(201).json({
      contact: req.body.contact,
      products: cameras,
      orderId: orderId
    });
  })["catch"](function (error) {
    return res.status(500).json(new Error(error));
  });
};