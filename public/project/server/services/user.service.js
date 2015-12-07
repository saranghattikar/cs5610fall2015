/**
 * Created by SarangPC on 11/12/2015.
 */
require('body-parser');
module.exports = function (app, model, appdb) {
    app.post("/api/project/user", adduser);
    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.post("/api/project/user/:uid/res/:rid", addrestaurant);
    app.delete("/api/project/user/:uid/res/:rid", deleterestaurant);
    app.get("/api/project/user/followings/:uid", getfollowings);
    app.get("/api/project/user/:uid/follow/:fid", addfollower);
    app.delete("/api/project/user/:uid/follow/:fid",deletefollower);




    function deletefollower(req,res){
        model
            .FindById(req.params.uid)
            .then(function (user) {
                var followings = user.following;
                var index;
                for (var i = 0; i < followings.length; i++) {
                    if(followings[i].equals(req.params.fid)){
                    index = i;
                        console.log("printing index");
                        console.log(i);
                    break;
                    }
                }
                followings.splice(i, 1);
                console.log(followings);
                user.following = followings;
                model
                    .Update(req.params.uid, user)
                    .then(function (updateduser) {
                        console.log("updated following list");
                        console.log(updateduser);
                        //updating followers list
                        res.json(updateduser);
                        deletefromfollowerslist(req.params.fid,req.params.uid);

                    });
            });

    }

    function deletefromfollowerslist(uid,fid){
        model
            .FindById(uid)
            .then(function (user) {
                var followers = user.followers;
                var index;
                for (var i = 0; i < followers.length; i++) {
                    if(followers[i].equals(fid)){
                        index = i;
                        break;
                    }
                }
                followers.splice(i, 1);
                user.followers = followers;
                model
                    .Update(uid, user)
                    .then(function (updateduser) {
                        console.log("updated followers list");
                        console.log(updateduser);
                    });
            });


    }





    function getfollowings(req, res) {
        console.log("in getfollowings");
       try {
           model
               .getfollowings(req.params.uid)
               .then(function (users) {
                   //console.log(users);
                   res.json(users);
               });
       }catch (error){
           console.log(error)
       }
    }




    function adduser(req, res) {
        var user = req.body;
        model
            .Create(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.json(err);
            });
    };

    function getAllUsers(req, res) {
        var uname = null;
        var pswd = null;
        uname = req.query.username;
        pswd = req.query.password;
        if (uname && pswd) {
            getUserByUsernameAndPassword(res, uname, pswd);
            return
        }
        if (uname) {
            getUserByUsername(res, uname);
            return
        }
        model
            .FindAll()
            .then(function (users) {
                res.json(users);
            });
    }

    function addrestaurant(req, res) {
        var restaurant = req.body || {};
        restaurant.id = restaurant._id = mongoose.Types.ObjectId();
        model
            .FindById(req.params.uid)
            .then(function (user) {
                var restaurants = user.favorites;
                restaurants.push(restaurant);
                user.favorites = restaurants;
                model
                    .Update(req.params.uid, user)
                    .then(function (updateduser) {
                        res.json(updateduser);
                    });
            });
    }

    function addfollower(req, res) {
        console.log("printing uid and fid");
        console.log(req.params.uid);
        console.log(req.params.fid);
        model
            .FindById(req.params.uid)
            .then(function (user) {
                var followings = user.following;
                followings.push(req.params.fid);
                user.following = followings;
                model
                    .Update(req.params.uid, user)
                    .then(function (updateduser) {
                        console.log("updated following list");
                        console.log(updateduser);
                        //updating followers list
                        addtofollowerslist(req.params.fid,req.params.uid);
                        res.json(updateduser);
                    });
            });
    }

    function addtofollowerslist(uid,followerid){
        console.log(addtofollowerslist);
        model
            .FindById(uid)
            .then(function (user) {
                var followers = user.followers;
                followers.push(followerid);
                user.followers = followers;
                model
                    .Update(uid, user)
                    .then(function (updateduser) {
                        console.log("updated followers list");
                        console.log(updateduser);
                    });
            });


    }


    function deleterestaurant(req, res) {
        var uid = req.params.uid;
        var rid = req.params.rid;
        console.log("in deleterestauran");
        console.log(uid);
        console.log(rid);


        model
            .FindById(req.params.uid)
            .then(function (user) {
                var restaurants = user.favorites;
                var index;
                for (i = 0; i < restaurants.length; i++) {
                    if(restaurants[i].id.equals(rid)) {
                        index = i;
                        break;
                    }
                }
                restaurants.splice(i, 1);
                user.favorites = restaurants;
                model
                    .Update(req.params.uid, user)
                    .then(function (updateduser) {
                        res.json(updateduser.favorites);
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

    function getUserByUsername(res, uname) {
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

    function getUserByUsernameAndPassword(res, uname, pswd) {
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
