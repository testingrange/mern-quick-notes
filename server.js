const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Checks token and this will be available on all routes
app.use(require('./config/checkToken'))

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

// const express = require('express')
// const path = require('path')
// const favicon = require('serve-favicon')
// const logger = require('morgan')

// // always require and configure near the top
// require('dotenv').config()
// // connect to the database at the connoction string url
// require('./config/database')

// const app = express() // create our app


// // comes from .env file or use 3001
// const PORT = process.env.PORT || 3001

// // Put api routes here
// app.use('/api/user', require('./routes/api/users'))

// app.use(logger('dev'))
// app.use(express.json())

// // Configure both the server-favicon and the static middleware to serve fromthe production 'build
// // folder



// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
// // telling our express app to use this
// // directory for our static assets
// app.use(express.static(path.join(__dirname, 'build')))


// // put all your other api routes here, beofre the "cathc all' toute so we can still hit them"
// app.get('/*', function(req, res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

// app.listen(PORT, function() {
//     console.log(`Hello there, Express app running on port ${PORT}`)
// })