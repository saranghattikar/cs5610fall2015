/**
 * Created by SarangPC on 11/12/2015.
 */
require('body-parser');
module.exports = function (app, model,appdb) {
    app.post("/api/project/user", adduser);
    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.post("/api/project/user/:uid/res/:rid", addrestaurant);



    function adduser(req, res) {
        var user = req.body;
        model
            .Create(user)
            .then(function (user) {
                res.json(user);
            }, function(err){
                res.json(err);
            });
    };

    function getAllUsers(req, res) {
        var uname=null;
        var pswd=null;
        uname = req.query.username;
        pswd = req.query.password;
        if (uname && pswd){
            getUserByUsernameAndPassword(res,uname,pswd);
            return
        }
        if(uname){
            getUserByUsername(res,uname);
            return
        }
        model
            .FindAll()
            .then(function (users) {
                res.json(users);
            });
    }

    function addrestaurant(req,res){
        console.log("in addrestaurant");
        var restaurant = req.body || {};
        restaurant.id = restaurant._id = mongoose.Types.ObjectId();
        console.log(restaurant);

        model
            .FindById(req.params.uid)
            .then(function (user) {
                var restaurants = user.favorites;
                console.log(user);
                restaurants.push(restaurant);
                user.favorites = restaurants;
                console.log(user);
                model
                    .Update(req.params.uid, user)
                    .then(function (updateduser) {
                        //console.log("in server");
                        console.log(updateduser);
                        res.json(updateduser);
                    });
            });
    }


    function getUserById(req, res) {
        model
            .FindById(req.params.id)
            .then(function (user) {
                console.log(user);
                res.json(user);
            });
    }

    function getUserByUsername(res,uname) {
        model
            .findUserByUsername(uname)
            .then(function (user) {
                res.json(user);
            });
    }


    /*   function getUserByUsername(req, res) {
     console.log("in getUserByUsername");
     model
     .findUserByUsername(req.params.username)
     .then(function (user) {
     res.json(user);
     });
     }*/

    function getUserByUsernameAndPassword(res,uname, pswd) {
        model
            .findUserByCredentials(uname, pswd)
            .then(function (user) {
                res.json(user);
            });
    }


    /*    function getUserByUsernameAndPassword(req, res) {
     var uname = req.params["username"];
     var pswd = req.params["password"];
     model
     .findUserByCredentials(uname, pswd)
     .then(function (user) {
     res.json(user);
     });
     }*/

    function updateUser(req, res) {
        //console.log("in updateUser server services");
        var id = req.params.id;
        var user = req.body;
        console.log(user);
        model
            .Update(id, user)
            .then(function (updateduser) {
                //console.log("in server");
                //console.log(updateduser);
                res.json(updateduser);
            });
    }

    function deleteUserById(req, res) {
        var id = req.params.id;

        model
            .Delete(id)
            .then(function (users) {
                res.json(users);
            });
    }


};
