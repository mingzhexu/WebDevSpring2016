/**
 * Created by mingzhexu on 3/21/16.
 */

module.exports = function(app, userModel) {

    app.post("/api/assignment/register", register);
    app.get("/api/assignment/user", getAllUser);
    app.get("/api/assignment/loggedin", getCurrentUser);
    app.get("/api/assignment/user/:id", getUserById);

    app.get("/api/assignment/user/:username", searchUsername);
    app.post("/api/assignment/user/:username/password/:password", findUserByCredentials);
    app.put("/api/assignment/user/:id", update);
    app.post("/api/assignment/logout", logout);
    app.delete("/api/assignment/user/:id", deleteUser);


    function getUserById(req, res)
    {
        var userId = req.params["id"];
        // use model to find user by id
        var user = userModel.findUserById(userId)
            .then(
                // return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function getCurrentUser(req, res)
    {
        console.log("get current user:", req.session.currentUser);
        res.json(req.session.currentUser);
    }

    function deleteUser(req, res)
    {
        var users = userModel.deleteUserById(req.params["id"]);
        res.json(users);
    }

    function update(req, res)
    {
        var index = req.params["id"];
        var user = req.body;
        console.log("req body:", req.body);
        console.log("req id:", req.params["id"]);
        req.session.currentUser = user;
        res.json(userModel.updateUser(index, user));
    }

    function getAllUser(req, res)
    {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user)
            // handle model promise
            .then(
            // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(user);
                    },
            // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                    }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.params["username"];
        var password = req.params["password"];

        var user = userModel.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }

    function searchUsername(req, res)
    {
        var name = req.params["username"];
        console.log("in user service server", name);
        res.json(userModel.findUserByUsername(name));
    }

    function logout(req, res)
    {
        req.session.destroy();
        res.send(200);
    }
};