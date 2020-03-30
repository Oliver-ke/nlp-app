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

app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

// test endpoint
app.get('/test', function(req, res) {
	res.send(mockAPIResponse);
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
