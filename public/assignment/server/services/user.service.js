/**
 * Created by SarangPC on 11/12/2015.
 */
module.exports = function (app, model) {
    console.log(" model in service");
    //console.log(model);
    //console.log(app.toString());
    app.post("/api/assignment/user", adduser);
    //app.get("/api/assignment/user?username=:username", getUserByUsername);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    //app.get("/api/assignment/user?username=:username&password=:password", getUserByUsernameAndPassword);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function adduser(req, res) {
        var user = req.body;
        model
            .Create(user)
            .then(function (users) {
                res.json(users);
            });
    }

    function getAllUsers(req, res) {
        console.log(req);
        var uname=null;
        var pswd=null;
        //req.params
        uname = req.query.username;
        pswd = req.query.password;
        //uname = req.param["username"];
        console.log(uname);
        console.log(pswd);
        //pswd = req.param["password"];
        if (uname & pswd){
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


    function getUserById(req, res) {
        console.log("in getUserById");
        console.log(req.params.id);
        model
            .FindById(req.params.id)
            .then(function (user) {
                console.log(user);
                res.json(user);
            });
    }

    function getUserByUsername(res,uname) {
        console.log("in getUserByUsername");
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
        console.log("in getUserByUsernameAndPassword");
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
        var id = req.params.id;
        var user = req.body;
        model
            .Update(id, user)
            .then(function (users) {
                res.json(users);
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
