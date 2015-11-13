/**
 * Created by SarangPC on 11/12/2015.
 */
module.exports = function (app, model) {
    app.post("/api/assignment/user", adduser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=:username", getUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", getUserByUsernameAndPassword);
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
        model
            .FindAll()
            .then(function (users) {
                res.json(users);
            });
    }

    function getUserById(req, res) {
        model
            .FindById(req.params.id)
            .then(function (user) {
                res.json(user);
            });
    }

    function getUserByUsername(req, res) {
        model
            .findUserByUsername(req.params.username)
            .then(function (user) {
                res.json(user);
            });
    }

    function getUserByUsernameAndPassword(req, res) {
        var uname = req.params["username"];
        var pswd = req.params["password"];
        model
            .findUserByCredentials(uname, pswd)
            .then(function (user) {
                res.json(user);
            });
    }

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
