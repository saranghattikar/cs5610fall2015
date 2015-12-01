var express = require('express');
var app = express();
//morgan = require("morgan");

//Loading application configuration
var config = require('./config')();
var db = (require('./database/mongo.js')(config.db.mongodb)).connect("cs5610");

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
//
//var MySchema = mongoose.Schema({
//    title: String
//}, {collection: "mymodel"});
//
//var MyModel = mongoose.model("MyModel", MySchema);
//
//MyModel.create({title: "Hello"}, function(err, doc){
//    console.log(doc);
//});

//console.log("db", db);

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var bodyParser = require('body-parser');

//Application Usage of Modules
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./public/assignment/server/app.js")(app,db);
app.listen(port, ipaddress);