var express = require('express');
var fs = require('fs')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mailer = require('express-mailer');
var dotenv = require('dotenv');
var schedule = require('node-schedule');
var fileUpload = require('express-fileupload');
var app = express();
var https = require('https');
// CronJob File

// Ends
app.use(cors())
dotenv.load();


app.use(logger('dev'));

// create a write Usersstream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// setup the logger
app.use(logger('combined', {stream: accessLogStream}))

// Json parser
app.use(bodyParser.json({limit: "2.7mb", extended: false}));
app.use(bodyParser.urlencoded({limit: "2.7mb", extended: false}));
app.use(fileUpload({
  limits: {
    fileSize: 10 * 1024 *1024
  }
}));
// Set views folder for emails
app.set('views', __dirname + '/views');
// Set template engin for view files
app.set('view engine', 'pug');

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Client-Key');
  if (req.method == 'OPTIONS') {
    res
      .status(200)
      .end();
  } else {
    next();
  }
});
// Make Images public
app.use(express.static('uploads'))


// SSL Cerificate
var server = require('http').createServer(app);
// var server = https.createServer({
//   key: fs.readFileSync(__dirname+'/crypto.key', 'utf8'),
//   cert: fs.readFileSync(__dirname+'/crypto.cert', 'utf8'),
//   requestCert: false,
//   rejectUnauthorized: false
// },app);

//Routes
app.use('/', require('./routes'));
// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start the server
app.set('port', process.env.PORT );
server.listen(app.get('port'), function () {
  console.log("P2P Application is running on 7878 port....");
});

process.on('uncaughtException', function(error) {}); // Ignore error

process.on('uncaughtException', (err) => {
  console.log("Error", err);
});

