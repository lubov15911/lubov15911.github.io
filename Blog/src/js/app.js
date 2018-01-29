const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');

// Initialize logger
const logger = require('winston');
logger.add(logger.transports.File, { filename: 'winston.log', formatter: require('./configs/fileFormatter'), json: false });
logger.remove(logger.transports.Console);

const app = express();

logger.info('[App]: Initialization');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let routes = require('./routes')();
app.use('/', routes);

module.exports = app;
