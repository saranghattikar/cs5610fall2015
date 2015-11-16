/**
 * Created by SarangPC on 11/13/2015.
 */
module.exports = function(app) {
    var usermodel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);
    //console.log("loaded model");
    //console.log(usermodel);
/*    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())*/
    //app.use(bodyParser());
    require("./services/user.service.js")(app, usermodel);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.js")(app, formModel);
};