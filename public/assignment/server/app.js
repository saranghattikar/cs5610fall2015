/**
 * Created by SarangPC on 11/13/2015.
 */
module.exports = function(app) {
    var usermodel = require("./models/user.model.js")(app);
    console.log("loaded model");
    console.log(usermodel);
    require("./services/user.service.js")(app, usermodel);
};