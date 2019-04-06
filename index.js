#!/usr/bin/nodejs

//---------------Load Packages---------------------------//
var express = require('express');
var request = require('request');
var cookieSession = require('cookie-session');
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
