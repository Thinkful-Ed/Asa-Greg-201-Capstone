var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080;


app.use('/bower_components', express.static(__dirname + '/bower_components'));

var staticPath = '/public';

if (process.env.ENVIRONMENT && process.env.ENVIRONMENT == 'production') {
    staticPath = '/public/dist';
}

app.use(express.static(__dirname + staticPath));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());

require('./app/routes.js')(app);

app.listen(port);

console.log('Listening on port ' + port);
