const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Initialize logger
const logger = require('winston');
logger.add(logger.transports.File, { filename: 'winston.log', formatter: require('./configs/fileFormatter'), json: false });
logger.remove(logger.transports.Console);

// Initialize database
const mongoose = require('mongoose');
mongoose.connect(require('./db/config').url);

const app = express();

logger.info('[App]: Initialization');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'blog system',
    resave: false,
    saveUninitialized: false
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());
require('./passport/config')(passport);

let routes = require('./routes/routes')();
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('notFound', { error: err.statusMessage });
});

module.exports = app;
