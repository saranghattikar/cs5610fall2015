/**
 * Created by SarangPC on 12/2/2015.
 */
/**
 * Created by SarangPC on 11/29/2015.
 */

'use strict';

var mongoose = require('mongoose'),
    objectId = mongoose.Schema.Types.ObjectId;
var userchema=require("./user.schema.js");

//{"id": "4543473b-d068-1048-e846-f68e04ea5c62","username": "zz","password": "zz", "firstName": "zz","lastName": "zz","email": "zz@zz.com","role": []}

// Define activity schema
module.exports = new mongoose.Schema({
    "id": {
        type: objectId
    },
    "excerpt": {
        type: String,
        required: true
        //unique: true
    },
    "user":{
        "id":{
            type:objectId,
            ref:'UserModel'
        },
        "firstname":{
            type:String
        },
        "lastname":{
            type:String
        }
    },
    "restaurantId":{
        type:String
    }
}, {collection: 'cs5610.project.review'});
