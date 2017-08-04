var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

app.post("/api/user/:userID/website", createWebsite);
app.get("/api/user/:userID/website", findWebsitesForUser);
app.get("/api/website/:webID", findWebsiteById);
app.put("/api/website/:webID", updateWebsite);
app.delete("/api/website/:webID", deleteWebsite);


function findWebsitesForUser(req, response) {

    var userID = req.params.userID;

    websiteModel
        .findWebsitesForUser(userID)
        .then(function (websites) {
            response.json(websites);
        }, function (err) {
            response.sendStatus(404).send(err);
        });

    // var sites = [];
    //
    // for (var w in websites) {
    //     if (websites[w].developerId == userID) {
    //         sites.push(websites[w]);
    //     }
    // }
    //
    // response.json(sites);
}

function findWebsiteById(req, response) {

    var webID = req.params.webID;

    websiteModel
        .findWebsiteById(webID)
        .then(function (website) {
            response.json(website);
        }, function (err) {
            response.sendStatus(404).send(err);
        });

    // for (var w in websites) {
    //     if (websites[w]._id == req.params.webID) {
    //         response.send(websites[w]);
    //         return;
    //     }
    // }
    //
    // response.sendStatus(404);
}


function createWebsite(req, response) {

    var website = req.body;
    var userID = req.params.userID;

    websiteModel
        .createWebsiteForUser(userID, website)
        .then(function (website) {
            response.json(website);
        });

    // website._id = (new Date()).getTime() + "";
    // website.developerId = userID;
    //
    // websites.push(website);
    //
    // response.json(website);
}

function deleteWebsite(req, response) {

    var webID = req.params.webID;

    websiteModel
        .deleteWebsite(webID)
        .then(function (status) {
            response.json(status)
        }, function (err) {
            response.sendStatus(404).send(err);
        });

    // for (var w in websites) {
    //     if (websites[w]._id == webID) {
    //         response.send(websites.splice(w, 1));
    //         return;
    //     }
    // }
    //
    // response.sendStatus(404);
}

function updateWebsite(req, response) {

    var webID = req.params.webID;
    var website = req.body;

    websiteModel
        .updateWebsite(webID, website)
        .then(function (status) {
            response.json(status)
        }, function (err) {
            response.sendStatus(404).send(err);
        });


    // for (var w in websites) {
    //     if (websites[w]._id == webID) {
    //         websites[w] = website;
    //         response.send(websites[w]);
    //         return;
    //     }
    // }
    //
    // response.sendStatus(404);

}
