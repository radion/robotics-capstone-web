var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// ============================= For Arduino =============================

// var SerialPort = require("serialport").SerialPort;
// var sp = new SerialPort("/dev/ttyACM0", {}, false);
// sp.open();

app.get('/lampRotateLeft', function(req, res) {
    sp.write('0');
    res.send('donelampRotateLeft');
});


app.get('/lampRotateRight', function(req, res) {
    sp.write('1');
    res.send('donelampRotateRight');
});

app.get('/lampColor1', function(req, res) {
    sp.write('2');
    res.send('donelampColor1');
});

app.get('/lampColor2', function(req, res) {
    sp.write('3');
    res.send('donelampColor2');
});

app.get('/lampColor3', function(req, res) {
    sp.write('4');
    res.send('donelampColor3');
});

app.get('/lampColor4', function(req, res) {
    sp.write('5');
    res.send('donelampColor4');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.listen(3000);
