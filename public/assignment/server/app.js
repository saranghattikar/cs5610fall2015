/**
 * Created by SarangPC on 11/13/2015.
 */
module.exports = function(app) {
    var usermodel = require("./models/user.model.js")(app);
    require("./services/user.service.server.js")(app, usermodel);
};