console.log("Hello from mongoose!");

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/webdev-summer-2-2017');

var userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    status: {type: String, enum: ["MARRIED", "SINGLE"]},
    dob: Date,
    created: {type: Date, default: Date.now()}
}, {collection: "user"});

var userModel = mongoose.model("UserModel", userSchema);

/*findAllUsers()
    .then(function (users) {
    console.log(users);
});*/

//createUser({username: 'bob'});

/*findUserByUsername("alice")
    .then(function (user) {
        console.log(user);
    });*/

/*findUserById("sdafadsfhjdsahfk")
    .then(function (user) {
        console.log(user);
    });*/


/*updateUser("fjaslk;fjas;lkf", {firstName: 'Alice', lastName: 'Wonderland'})
    .then(function (status) {
        console.log(status);
    });*/

/*removeUser("fasdlf;kdlasfas")
    .then(function (status) {
        console.log(status);
    });*/


function removeUser(userID) {
    return userModel.remove({_id: userID});
}


function updateUser(userID, user) {
    return userModel.update({_id: userID}, {$set: user});
}

function findUserById(id) {
    return userModel.findById(id);
}


function findUserByUsername(username) {
    return userModel.find({username: username});
}

function findAllUsers() {
    return userModel.find();
}

function createUser(user) {
    userModel.create(user, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
}


