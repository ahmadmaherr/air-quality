require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes');

const mongoose = require('mongoose');

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const { databaseConfig, serverConfig } = require('./config');

const { checkAirQualityParis } = require('./cron/checkAirQualityParis');

app.listen(serverConfig.port, function () {
	console.log('listening on port ' + serverConfig.port);
});

app.use('/api', routes);

checkAirQualityParis();

mongoose.connect(databaseConfig.uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});
