/**
 * Created by mingzhexu on 3/21/16.
 */

module.exports = function(app, userModel) {

    app.post("/api/assignment/register", register);
    app.get("/api/assignment/user", getAllUser);
    app.get("/api/assignment/loggedin", getCurrentUser);

    app.get("/api/assignment/search", findUserByUsername);
    app.post("/api/assignment/login", findUserByCredentials);
    app.put("/api/assignment/user/:id", update);
    app.post("/api/assignment/logout", logout);
    app.delete("/api/assignment/user/:id", deleteUser);


    function getCurrentUser(req, res)
    {
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
        res.json(userModel.updateUser(index, user));
    }

    function getAllUser(req, res)
    {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function findUserByUsername(req, res)
    {
        var username = req.body;
        console.log(username);
        res.json(userModel.findUserByUsername(username));
    }

    function logout(req, res)
    {
        req.session.destroy();
        res.send(200);
    }
};