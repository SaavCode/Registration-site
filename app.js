var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();
//app.set :method that allows us to set certain settings
//in the app
app.set("view engine", "ejs");
//tell app to use body parser
app.use(bodyParser.urlencoded({extended: true}));
//take whatever is in the publlic directory, and make them usable to views.
// lets ejs use css
app.use(express.static(__dirname + "/public"));
//setup connection with nessaav: for sql
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-02.cleardb.net',
  user     : 'bbda529469cfe9',
  database : 'heroku_44bb9b625168163',
  password: '4af409fc'
});
//connect mysql and express
//shows number of users
//find count of users
//respond with the count
//redidrected here
app.get("/", function(req, res){
    // Find count of users in DB
    var q = "SELECT COUNT(*) AS count FROM users";
    //pass in query
    connection.query(q, function(err, results){
        if(err) throw err;
        var count = results[0].count;
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
  //person object
    var person = {
       //stores email in thewrequest body
        email: req.body.email
    };
//query, insert sigle user
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});
//start the server
app.listen(process.env.PORT, function(){
    console.log("Server running on Heroku env port!");
});
