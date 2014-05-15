// ************************************************************************************
// Craig Odell 2014
// ************************************************************************************

// Metric Model

// Setup reqs
var mongoose = require('mongoose');
var util = require('util');

// Connect the database
var db = mongoose.createConnection(process.env.MONGO_URI);
db.on('error', function (err) {
    util.error('Mongo connection error! Abort!' + util.inspect(err));
});
db.once('open', function () {
    util.log('Metric - Mongo connection successful.');
});

// The Metric model definition - should match rails side!
// ************************************************************************************
var metricSchema = new mongoose.Schema({
    createdAt: {type: Date, required: true, index: true},
    value: {type: Number, required: true, index: true}
});

// ************************************************************************************
var Metric = db.model('Metric', metricSchema, 'metrics'); //Last arg is collection nam
module.exports = Metric;
