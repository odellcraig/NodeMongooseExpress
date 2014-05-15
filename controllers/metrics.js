// ************************************************************************************
// Craig Odell 2014
// ************************************************************************************

// Metrics Controller

// Setup reqs
var async = require('async');
var util = require('util');
var mongoose = require('mongoose');
var Metric = require('../models/metric');

// Connect the database
var db = mongoose.createConnection(process.env.MONGO_URI);
db.on('error', function (err) {
    util.error('Mongo connection error! Abort!' + util.inspect(err));
});
db.once('open', function () {
    util.log('MetricsController - Mongo connection successful.');
});



// ************************************************************************************
function MetricsController() {
    "use strict";
    util.log('MetricsController Connected.');
}

// ************************************************************************************
MetricsController.prototype.Finish = function () {
    util.log('MetricsController Finished.');
}


// ************************************************************************************
MetricsController.prototype.read = function (req, callback) {
    // For now this just returns all the metrics ever created (could time filter)
    return Metric.find({}, function (err, metrics) {
        if (err) { util.error(util.inspect(err)); }
        return callback(err, metrics);
    });
}

// ************************************************************************************
MetricsController.prototype.create = function (req, callback) {
    return Metric.create(req.body.metrics, function (err) {
        if (err) { util.error(util.inspect(err)); }
        return callback(err);
    });
}

// ************************************************************************************
exports.MetricsController = MetricsController;
