var app = require("../express");

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

    page._id = (new Date()).getTime() + "";
    page.websiteId = webID;

    pages.push(page);

    response.json(page);
}

function findPagesByWebsiteId(req, response) {

    var webID = req.params.webID;

    var pgs = [];

    for (var p in pages) {
        if (pages[p].websiteId == webID) {
            pgs.push(pages[p]);
        }
    }
    response.json(pgs);

}

function findPageById(req, response) {

    var pageID = req.params.pageID;

    for (var p in pages) {
        if (pages[p]._id == pageID) {
            response.json(pages[p]);
            return;
        }
    }

    response.sendStatus(404);
}

function updatePage(req, response) {

    var pageID = req.params.pageID;
    var page = req.body;

    for (var p in pages) {
        if (pages[p]._id == pageID) {
            pages[p] = page;
            response.json(pages[p]);
            return;
        }
    }

    response.sendStatus(404);
}

function deletePage(req, response) {

    var pageID = req.params.pageID;

    for (var p in pages) {
        if (pages[p]._id == pageID) {
            response.json(pages.splice(p, 1));
            return;
        }
    }

    response.sendStatus(404);
}