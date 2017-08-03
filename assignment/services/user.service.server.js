var app = require("../../express");
var userModel = require("../model/user/user.model.server");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];


//html handlers
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userID", updateUser);
app.delete("/api/user/:userID", deleteUser);
app.get("/api/users/:userID", findUserById); //path parameter


function findUserById(req, response) {

    userModel
        .findUserById(req.params.userID)
        .then(function (user) {
            response.json(user);
        })

    /*for (var u in users) {
     if (users[u]._id === req.params.userID) {
     response.send(users[u]);
     return;
     }
     }*/

}
function findUser(req, response) {

    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {

        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.send("0");
                return;
            });

        return;

        // for (var u in users) {
        //     if (users[u].username === username && users[u].password === password) {
        //         response.send(users[u]);
        //         return;
        //     }
        // }
    } else if (username) {

        userModel.findUserByUsername(username)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.send("0");
                return;
            });

        return;

        // for (var u in users) {
        //     if (users[u].username === username) {
        //         response.send(users[u]);
        //         return;
        //     }
        // }
    }

    //response.send("0");

}

function registerUser(req, response) {

    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            response.json(user);
        })

    // user._id = (new Date()).getTime() + "";
    // users.push(user);
    // response.send(user);
    // return;
}

function updateUser(req, response) {

    var userID = req.params.userID;
    var user = req.body;

    userModel
        .updateUser(userID, user)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });

    /*for (var u in users) {
     if (users[u]._id == userID) {
     users[u] = user;
     response.send(users[u]);
     return;
     }
     }

     response.sendStatus(404);*/
}

function deleteUser(req, response) {

    var userID = req.params.userID;

    userModel
        .deleteUser(userID)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });

    // for (var u in users) {
    //     if (users[u]._id == userID) {
    //         response.send(users.splice(u, 1));
    //         return;
    //     }
    // }
    //
    // response.sendStatus(404);
}





