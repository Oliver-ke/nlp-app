var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const { config } = require('dotenv');
const Aylien = require('aylien_textapi');
config();

const app = express();

const textapi = new Aylien({
	application_id: process.env.APP_ID,
	application_key: process.env.API_KEY
});

app.use(express.static('dist'));

app.get('/', function(req, res) {
	// res.sendFile('dist/index.html')
	res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
	console.log('Example app listening on port 8080!');
});

app.get('/test', function(req, res) {
	res.send(mockAPIResponse);
});
