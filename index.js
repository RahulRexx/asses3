var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');


app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


var prod = false;
var MONGODB_URI = "mongodb://localhost:27017/category"

if (prod) {
    var prod_url = require('./configuration/connection');
    url = prod_url;
}


var categoryroute = require('./routes/category_routes');
var dbb = require('./configuration/collection');

categoryroute.configure(app,mongo,ObjectID,MONGODB_URI,assert,dbb);



app.get('/',(req,res) => {
    res.json("Welcome to the category handler");
});


app.listen(app.get('port'),() => {
    console.log("server started on port "+ app.get('port'));
});