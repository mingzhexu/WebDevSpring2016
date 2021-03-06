/**
 * Created by mingzhexu on 4/4/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        roles: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'user'});
    return UserSchema;
};