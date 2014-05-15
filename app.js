// ************************************************************************************
// Craig Odell 2014
// ************************************************************************************

// Module dependincies
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');



// Don't define app with var => global
app = express();


app.configure(function () {
    "use strict";
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    "use strict";
    app.use(express.errorHandler());
});

//****************************
// Define the routes.
//****************************
require('./routes');


///////////////////////////////////////////////////////////////////////////////////////
// Start the server
///////////////////////////////////////////////////////////////////////////////////////
var server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

