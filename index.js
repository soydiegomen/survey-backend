var express = require('express'),
	bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Load the routes ("controllers" -ish)
//app.use('/api', require('./tv-shows/router'));
app.use('/api', require('./companys/router'));

// Export the app instance for unit testing via supertest
module.exports = app