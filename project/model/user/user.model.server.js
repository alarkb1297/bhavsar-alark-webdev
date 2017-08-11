var mongoose = require('mongoose');
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addBookToBookShelf = addBookToBookShelf;
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

function findUserByGoogleId(googleID) {
    return userModel
        .findOne({"google.id" : googleID});
}

function addBookToBookShelf(userID, book) {
    return userModel
        .findUserById(userID)
        .then(function (user) {
            user.bookShelf.push(book);
            return user.save();
        })
}