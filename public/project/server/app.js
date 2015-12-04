/**
 * Created by SarangPC on 11/13/2015.
 */
module.exports = function(app,appDb) {

    var reviewModel = require("./models/review.model.js")(app,appDb);
    var usermodel = require("./models/user.model.js")(app,appDb);

    //console.log("Heloo from app.js in project");
    console.log("loding service to explore Yelp api");
    require("./services/review.service.js")(app,reviewModel,appDb);
    require("./services/user.service.js")(app, usermodel,appDb);
};