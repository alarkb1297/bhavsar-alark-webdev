var app = require("../../express");
var widgetModel = require("../model/widget/widget.model.server");

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "https://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});

//html handlers
app.post("/api/page/:pageID/widget", createWidget);
app.get("/api/page/:pageID/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetID", findWidgetById);
app.put("/api/widget/:widgetID", updateWidget);
app.delete("/api/widget/:widgetID", deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageID/widget", sortWidgets);


function createWidget(req, response) {
    var widget = req.body;
    var pageID = req.params.pageID;

    widgetModel
        .createWidget(pageID, widget)
        .then(function (widget) {
            response.json(widget);
        });

}

function findWidgetsByPageId(req, response) {

    var pageID = req.params.pageID;

    widgetModel
        .findAllWidgetsForPage(pageID)
        .then(function (widgets) {
            response.json(widgets);
        }, function (err) {
            response.sendStatus(404).send(err);
        });

}

function findWidgetById(req, response) {

    var widgetID = req.params.widgetID;

    widgetModel
        .findWidgetById(widgetID)
        .then(function (widget) {
            response.json(widget);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function updateWidget(req, response) {

    var widgetID = req.params.widgetID;
    var widget = req.body;

    widgetModel
        .updateWidget(widgetID, widget)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function deleteWidget(req, response) {

    var widgetID = req.params.widgetID;

    widgetModel
        .deleteWidget(widgetID)
        .then(function (status) {
            response.json(status)
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });

}

function uploadImage(req, response) {

    var widgetID = req.body.widgetID;
    var width = req.body.width;
    var myFile = req.file;

    var userID = req.body.userID;
    var webID = req.body.webID;
    var pageID = req.body.pageID;

    var callbackUrl = "/assignment/#!/user/" + userID + "/website/" + webID + "/page/" + pageID + "/widget/" + widgetID;

    if (myFile == null) {
        res.redirect(callbackUrl);
        return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;


    for (var w in widgets) {
        if (widgets[w]._id == widgetID) {
            var widget = (widgets[w]);
        }
    }

    widget.url = '/uploads/' + filename;

    response.redirect(callbackUrl);
}

function sortWidgets(req, response) {

    var start = req.query.initial;
    var end = req.query.final;
    var pageID = req.params.pageID;

    widgetModel
        .reorderWidget(pageID, start, end)
        .then(function (widgets) {
            response.json(widgets);
        })
}

