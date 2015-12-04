/**
 * Created by SarangPC on 12/3/2015.
 */
'use strict';

var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;
//var userchema=require("./user.schema.js");

//{"id": "4543473b-d068-1048-e846-f68e04ea5c62","username": "zz","password": "zz", "firstName": "zz","lastName": "zz","email": "zz@zz.com","role": []}
var line = mongoose.Schema({
    "type" : String

});

// Define activity schema
module.exports = new mongoose.Schema({
    "id": {
        type: objectId
    },
    "yelpId": {
        type: String,
        required: true
        //unique: true
    },
    "name":{
      type: String
    },
    "address":[line],
    "city":{
      type: String
    },
    "state":{
        type: String
    },
    "phonenumber":{
        type: String
    }
}, {collection: 'cs5610.project.restaurant'});