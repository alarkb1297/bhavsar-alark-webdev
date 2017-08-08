var mongoose = require('mongoose');
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
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

function addWebsite(userID, websiteID) {
    return userModel
        .findById(userID)
        .then(function (user) {
            user.websites.push(websiteID);
            return user.save();
        });
}

function removeWebsite(userID, websiteID) {
    return userModel
        .findById(userID)
        .then(function (user) {
            var index = user.websites.indexOf(websiteID);
            user.websites.splice(index, 1);
            return user.save();
        });
}
