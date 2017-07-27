var app = require("../express");

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

//html handlers
app.post("/api/page/:pageID/widget", createWidget);
app.get("/api/page/:pageID/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetID", findWidgetById);
app.put("/api/widget/:widgetID", updateWidget);
app.delete("/api/widget/:widgetID", deleteWidget);

function createWidget(req, response) {
    var widget = req.body;
    var pageID = req.params.pageID;

    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageID;

    widgets.push(widget);

    response.json(widget);
}

function findWidgetsByPageId(req, response) {

    var pageID = req.params.pageID;

    var wdgts = [];

    for (var w in widgets) {
        if (widgets[w].pageId == pageID) {
            wdgts.push(widgets[w]);
        }
    }

    response.json(wdgts);

}

function findWidgetById(req, response) {

    var widgetID = req.params.widgetID;

    for (var w in widgets) {
        if (widgets[w]._id == widgetID) {
            response.json(widgets[w]);
            return;
        }
    }

    response.sendStatus(404);
}

function updateWidget(req, response) {

    var widgetID = req.params.widgetID;
    var widget = req.body;

    for (var w in widgets) {
        if (widgets[w]._id == widgetID) {
            widgets[w] = widget;
            response.json(widgets[w]);
            return;
        }
    }

    response.sendStatus(404);
}

function deleteWidget(req, response) {

    var widgetID = req.params.widgetID;

    for (var w in widgets) {
        if (widgets[w]._id == widgetID) {
            response.json(widgets.splice(w, 1));
            return;
        }
    }

    response.sendStatus(404);
}

