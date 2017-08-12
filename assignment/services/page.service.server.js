var app = require("../../express");
var pageModel = require("../model/page/page.model.server");

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

//html handlers
app.post("/api/website/:webID/page", createPage);
app.get("/api/website/:webID/page", findPagesByWebsiteId);
app.get("/api/page/:pageID", findPageById);
app.put("/api/page/:pageID", updatePage);
app.delete("/api/page/:pageID", deletePage);

function createPage(req, response) {
    var page = req.body;
    var webID = req.params.webID;

    pageModel
        .createPage(webID, page)
        .then(function (page) {
            response.json(page);
        });

}

function findPagesByWebsiteId(req, response) {

    var webID = req.params.webID;

    pageModel
        .findAllPagesForWebsite(webID)
        .then(function (pages) {
            response.json(pages);
        }, function (err) {
            response.sendStatus(404).send(err);
        });

    // var pgs = [];
    //
    // for (var p in pages) {
    //     if (pages[p].websiteId == webID) {
    //         pgs.push(pages[p]);
    //     }
    // }
    // response.json(pgs);

}

function findPageById(req, response) {

    var pageID = req.params.pageID;

    pageModel
        .findPageById(pageID)
        .then(function (page) {
            response.json(page);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

    // for (var p in pages) {
    //     if (pages[p]._id == pageID) {
    //         response.json(pages[p]);
    //         return;
    //     }
    // }
    //
    // response.sendStatus(404);
}

function updatePage(req, response) {

    var pageID = req.params.pageID;
    var page = req.body;

    pageModel
        .updatePage(pageID, page)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

    // for (var p in pages) {
    //     if (pages[p]._id == pageID) {
    //         pages[p] = page;
    //         response.json(pages[p]);
    //         return;
    //     }
    // }
    //
    // response.sendStatus(404);
}

function deletePage(req, response) {

    var pageID = req.params.pageID;

    pageModel
        .deletePage(pageID)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

    // for (var p in pages) {
    //     if (pages[p]._id == pageID) {
    //         response.json(pages.splice(p, 1));
    //         return;
    //     }
    // }
    //
    // response.sendStatus(404);
}