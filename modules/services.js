/**
 * Campanier Api services
 */

exports.hello = function (req, res , next) {
  var config = require('./config.js');

  res.setHeader('Access-Control-Allow-Origin','*');
  res.send(200, { name: config.api.name, version: config.api.version });
  return next();
};

exports.getBaskets = function (req, res , next) {
  var config  = require('./config.js');
  var db = require("mongojs").connect(config.db.url, config.db.collections);

  db.paniers.find().sort({ 'type': 1 }, function (err, docs) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send(200, { baskets: docs });
    return next();
  });
};
