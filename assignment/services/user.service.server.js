var app = require("../../express");

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

    for (var u in users) {
        if (users[u]._id === req.params.userID) {
            response.send(users[u]);
            return;
        }
    }

}
function findUser(req, response) {

    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        for (var u in users) {
            if (users[u].username === username && users[u].password === password) {
                response.send(users[u]);
                return;
            }
        }
    } else if (username) {
        for (var u in users) {
            if (users[u].username === username) {
                response.send(users[u]);
                return;
            }
        }
    }

    response.send("0");

}

function registerUser(req, response) {

    var user = req.body;
    user._id = (new Date()).getTime() + "";
    users.push(user);
    response.send(user);
    return;
}

function updateUser(req, response) {

    var userID = req.params.userID;
    var user = req.body;

    for (var u in users) {
        if (users[u]._id == userID) {
            users[u] = user;
            response.send(users[u]);
            return;
        }
    }

    response.sendStatus(404);
}

function deleteUser(req, response) {

    var userID = req.params.userID;

    for (var u in users) {
        if (users[u]._id == userID) {
            response.send(users.splice(u, 1));
            return;
        }
    }

    response.sendStatus(404);
}





