var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");
var passport       = require('passport');

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
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
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
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
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
            return;
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

    websiteModel.deleteWebsite(webID)
        .then(function (status) {
            response.json(status);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
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
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
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
