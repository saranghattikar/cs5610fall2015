/**
 * Created by SarangPC on 11/29/2015.
 */

'use strict';


var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;
var restaurantSchema = require("./restaurant.schema.js");
//{"id": "4543473b-d068-1048-e846-f68e04ea5c62","username": "zz","password": "zz", "firstName": "zz","lastName": "zz","email": "zz@zz.com","role": []}

// Define activity schema


    var user = new mongoose.Schema({
    "id": {
        type: objectId
    },
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "firstName": {
        type: String
    },
    "lastName": {
        type: String
    },
    "email": {
        type: String,
        required: true
    },
    "favorites":[restaurantSchema],
    "followers": [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    "following": [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
}, {collection: 'cs5610.project.user'});

module.exports = user;
