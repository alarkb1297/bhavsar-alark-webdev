var mongoose = require('mongoose');
var userSchema = require("../schemas/user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userID) {
    return userModel.findById(userID);
}

function updateUser(userID, user) {
    return userModel.update({_id: userID},
        {$set: user});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userID) {
    return userModel.remove({_id: userID});
}