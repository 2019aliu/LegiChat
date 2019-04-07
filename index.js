#!/usr/bin/nodejs

//---------------Load Packages---------------------------//
var express = require('express');
var request = require('request');
var path = require('path');
var cookieSession = require('cookie-session');
var mysql = require('mysql');
var hbs = require('hbs');
var cookies = require('cookies');
var axios = require('axios');
var app = express();

//---------------Express init----------------------------//
app.set('port', process.env.PORT || 8080 );  // set up the port
app.set('view engine', 'hbs');  // set up handlebars
app.set('trust proxy', 1);

//-----------------init cookies--------------------//
app.use(cookieSession({
  name: 'snoopy',
  keys: ['BlizzIsBad', 'AtLifeAndEverythingElse']
}));

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

var xAPIKey = 'ie5EtNqb2pafUpw0FsMC84hHqrW9L4uf2Ql9YTJF';
axios.defaults.headers.common['X-API-Key'] = xAPIKey
var endpoint = 'https://fmrrixuk32.execute-api.us-east-1.amazonaws.com/hacktj/legislators'

app.get('/', function(req, res){
    res.render('indexLogin');
//   if(typeof res.session == 'undefined') {
//     res.render('indexLogin');
//   }
//   else{
//   res.render('index');
//   }
});

app.get('/forum', function(req, res){
    if (typeof res.session == 'undefined') {
        res.redirect('login');
    }
    pool.query("SELECT zipcode FROM users WHERE username = ?;", [req.session.token], function(error,results, fields) {
        if (error) throw error;
        var zip = results[0];
        var parameters = {
            'level': 'NATIONAL_LOWER',
            'address': zip
          }
    
        axios.get(endpoint, {
            params: parameters
          }).then(function(response) {
            var representatives = response.data.officials
            // Finally, we pick out the data we want and print it to the console
            // Use Postman to figure out what format your data is in and access it accordingly
            representatives.forEach(function(representative) {
              var firstName = representative['first_name']
              var lastName = representative['last_name']
              var message = firstName + " " + lastName;
              var ret = {
                  firstName, lastName, message
              }
              res.render('index',{"legislatorName": message});
            })
            
          }).catch(function(error) {
            if (xAPIKey === '') {
              console.error('GET Request failed, your API Key is empty!')
              console.error('Set the `xAPIKey` variable\'s value (line 6) to your Phone2Action API Key!')
            } else {
              console.error(error);
            }
            throw (error);
          })

        res.render('index');
    })
    
})

// app.get('/getLegislators', function(req, res){
//     pool.query
    
//     var zipcode = req.query.zip;

//     var parameters = {
//         'level': 'NATIONAL_LOWER',
//         'address': zipcode
//       }

//     axios.get(endpoint, {
//         params: parameters
//       }).then(function(response) {
//         var representatives = response.data.officials
//         // Finally, we pick out the data we want and print it to the console
//         // Use Postman to figure out what format your data is in and access it accordingly
//         representatives.forEach(function(representative) {
//           var firstName = representative['first_name']
//           var lastName = representative['last_name']
//           var message = 'Your Representative in national Congress is' + firstName + lastName;
//           var ret = {
//               firstName, lastName, message
//           }
//           res.render('index',)
//         })
        
//       }).catch(function(error) {
//         if (xAPIKey === '') {
//           console.error('GET Request failed, your API Key is empty!')
//           console.error('Set the `xAPIKey` variable\'s value (line 6) to your Phone2Action API Key!')
//         } else {
//           console.error(error);
//         }
//         throw (error);
//       })
      
      
// });

app.get('/register', function(req, res) {
  res.render('register');
});

app.get('/makeuser', function(req, res) {
    console.log(req.query);
  var myEmail = req.query.email;
    var myUsername = req.query.username;
    var myPassword = req.query.password;
    var myZip = parseInt(req.query.zip, 10);

    // var addUser = 'call initialize_user("' + myEmail + '",' +  username + '",' + password + '",' + zip + ')';
    var addUser = 'call initialize_user(?, ?, ?, ?);';
    
    pool.query(addUser, [myEmail, myUsername, myPassword, myZip], function(error, results, fields){
        if (error) throw error;
        var message = "Registration is successful! Please log in with your new credentials";
        var response = {
            msg: message
        };
        res.send(response);
    });
});

app.get('/login', function(req, res) {
    res.render("login");
});

app.get('/login_endpoint', function(req, res){
    var myUsername = req.query.username;
    var myPassword = req.query.password;

    pool.query("SELECT * FROM users WHERE email=?", [myUsername], function(error, results, fields){
        if (error) throw error;
        var cook = new cookies(req, res, ['fdsa']);
        if(results.length > 0) {
          if(results[0].password == myPassword) {
            //create "logged in" cookie here
            cook.set("token", results[0].username);
            res.send("login");
          }
          else {
            res.send("Incorrect password.")
          }
        } 
        else {
        	pool.query("SELECT * FROM users WHERE email=?", [myUsername], function(error, results, fields){
			    if (error) throw error;
			    if(results.length > 0) {
            if(results[0].password == myPassword) {
            //create "logged in" cookie here
            cook.set("token", results[0].username);
              res.send("login");
            }
            else {
              res.send("Incorrect password.")
            }
          } 
          else {
			    	res.send("Incorrect email or username.");	
			    }
			    
			 });
      }
        

    });
});

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});