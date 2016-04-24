/**
 * Created by mingzhexu on 4/23/16.
 */
module.exports = function(app, db, mongoose) {
    var userModel   = require("./models/user.model.server.js")(db, mongoose);
    var courseModel = require("./models/course.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var courseService = require("./services/course.service.server.js")(app, userModel, courseModel);
}