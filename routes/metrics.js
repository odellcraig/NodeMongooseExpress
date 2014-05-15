// ************************************************************************************
// Copyright (c) Craig Odell 2013
// ************************************************************************************

// User Routes
var _mc = require('../controllers/metrics');
var Metric = require('../models/metric');
var MetricsController = new _mc.MetricsController();
var util = require('util');



// ************************************************************************************
app.get('/metrics', function (req,res) {
    util.log("GET /metrics start");
    return MetricsController.read(req, function (err, metrics) {
        if (err) { util.error(util.inspect(err)); }
        return res.send(JSON.stringify(metrics));
    });
});

// ************************************************************************************
app.post('/metrics', function (req,res) {
    util.log("POST /metrics start");
    if (req.body) {
        return MetricsController.create(req, function (err) {
            if (err) { util.error(util.inspect(err)); }
            return res.send(200);
        });
    } else {
        util.error("/metrics - no body given: " + util.inspect(req.body));
        return res.send(400);
    }
});
