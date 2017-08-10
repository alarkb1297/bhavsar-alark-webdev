var mongoose = require('mongoose');
var widgetSchema = require("./widget.schema.server");
var pageSchema = require("../page/page.schema.server")
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = mongoose.model("PageModel", pageSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

function createWidget(pageID, widget) {
    var widgetTemp;

    widget._page = pageID;
    return widgetModel.create(widget)
        .then(function (widgetDoc) {
            widgetTemp = widgetDoc;
            return pageModel.addWidget(pageID, widgetDoc._id);
        })
        .then(function (page) {
            return widgetTemp;
        })
}

function findAllWidgetsForPage(pageID) {
    // return widgetModel
    //     .find({_page: pageID})
    //     .populate('_page', ['name'])
    //     .exec();


    return pageModel
        .findPageById(pageID)
        .populate('widgets')
        .exec()
        .then(function (page) {
            return page.widgets;
        })
}

function findWidgetById(widgetID) {
    return widgetModel.findById(widgetID);
}

function updateWidget(widgetID, widget) {
    return widgetModel.update(
        {_id: widgetID},
        {$set: widget});
}

function deleteWidget(widgetID) {

    var pageID;

    return widgetModel
        .findWidgetById(widgetID)
        .then(function (widget) {
            pageID = widget._page;
            return pageModel.removeWidget(pageID, widgetID);
        })
        .then(function (page) {
            return widgetModel.remove({_id: widgetID});
        })
}

function reorderWidget(pageID, start, end) {

    return pageModel
        .findPageById(pageID)
        .then(function (page) {
            page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
            return page.save();
        });

}
