/**
 * Created by mingzhexu on 3/21/16.
 */
module.exports = function(app) {
    var userModel   = require("./models/user.model.js")();
    var service     = require("./services/user.service.server.js")(app, userModel);
}