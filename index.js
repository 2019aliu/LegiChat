#!/usr/bin/nodejs

//---------------Load Packages---------------------------//
var express = require('express');
var request = require('request');
var path = require('path');
var mysql = require('mysql');
var hbs = require('hbs');
var app = express();

//---------------Express init----------------------------//
app.set('port', process.env.PORT || 8080 );  // set up the port
app.set('view engine', 'hbs');  // set up handlebars
app.set('trust proxy', 1);

//---------------Server Static Folders-------------------//
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));

//--------------Connect database pool-------------//
var pool  = mysql.createPool({
  connectionLimit : 10,
  user            : 'site_legichat',
  password        : '3QWmQHvXEPu862bWaktFxSGe',
  host            : 'mysql1.csl.tjhsst.edu',
  port            : 3306,
  database        : 'site_legichat'
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/register', function(req, res) {
	res.render('register');
});

app.get('/makeuser', function(req, res) {
	
});

app.get('/login', function(req, res) {
    res.render('login');
});
// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});