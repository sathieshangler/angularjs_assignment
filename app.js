/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// serve the files out of ./public as our main files
/*app.use(express.static(__dirname + '/public'));*/

//Routing For Index
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
});


app.use('/', express.static(__dirname + '/'));


var appEnv = cfenv.getAppEnv();
const server = require('http').createServer(app);


// start server on the specified port and binding host
server.listen(appEnv.port, '0.0.0.0', function () {
	// print a message when the server starts listening
	console.log("server starting on " + appEnv.url);
});






