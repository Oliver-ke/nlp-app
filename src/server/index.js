var path = require('path');
const express = require('express');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js');
const { config } = require('dotenv');
const Aylien = require('aylien_textapi');

// configure env
config();

const app = express();

// add cors middleware
app.use(cors());

// initializing and instance of the Aylien class
const textapi = new Aylien({
	application_id: process.env.APP_ID,
	application_key: process.env.API_KEY
});

app.use(express.static('dist'));

// setup express body-perser for json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// endpoint to handle app request
app.post('/nlp', (req, res) => {
	const { text } = req.body;
	const payload = { text, mode: 'tweet' };

	if (req.body.url) payload.url = req.body.url;

	textapi.sentiment(payload, (err, response) => {
		if (err) {
			console.log(err);
			return res.status(500).json('Api request error');
		}
		return res.status(200).json(response);
	});
});

// endpoint to serve page
app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

// test endpoint
app.get('/test', function(req, res) {
	res.send(mockAPIResponse);
});

// server port, using 5000 or env during production
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
