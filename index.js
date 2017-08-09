/*main start point*/
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');


//app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: "*/*"}));

//db setup
mongoose.connect('mongodb://localhost:auth/auth');


//handle routes
router(app);

//server setup
//use the env port of 3090
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on ', port); //deleteinbuild