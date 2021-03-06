/**
 * Created by mingzhexu on 3/21/16.
 */

var passport      = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
module.exports = function(app, userModel) {


    var auth = authorized;

    app.post("/api/assignment/login",passport.authenticate('local'), login );

    app.post("/api/assignment/admin/user", register);
    app.get("/api/assignment/admin/user", getAllUser);
    app.get("/api/assignment/loggedin", getCurrentUser);
    app.get("/api/assignment/admin/user/:id", getUserById);
    app.get("/api/assignment/user/:username", searchUsername);
    app.post("/api/assignment/user/:username/password/:password", findUserByCredentials);
    app.put("/api/assignment/admin/user/:id", update);
    app.post("/api/assignment/logout", logout);
    app.delete("/api/assignment/admin/user/:id", deleteUser);

    app.get("/api/assignment/admin/sort", auth, sortCategory);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req,res){
        var user = req.user;
        res.json(user);
    }

    function loggedin(req,res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req,res){
        req.logOut();
        res.send(200);
    }

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
        userModel
            .deleteUserById(req.params["id"])
            .then(
                function(doc){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                })
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function update(req, res)
    {
        var index = req.params["id"];
        var user = req.body;
        console.log("req body:", req.body);
        console.log("req id:", req.params["id"]);
        req.session.currentUser = user;
        userModel
            .updateUser(index, user)
            .then(
                function(doc){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllUser(req, res)
    {
        var users = userModel.findAllUsers()
            .then(
                function(doc){
                    console.log("find all users in server service", doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function register(req, res) {
        var user = req.body;
        console.log("the user in servers ervice", user);
        userModel.createUser(user)
            // handle model promise
            .then(
            // login user if promise resolved
                function(doc) {
                    req.session.currentUser = doc;
                    return userModel.findAllUsers();
                },
            // send error if promise rejected
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
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


    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function sortCategory(req,res){
        if(isAdmin(req.user)){
            var category = req.query.category;
            var dir = req.query.dir;
            userModel.sortCategory(category, dir)
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
        }
    }

};