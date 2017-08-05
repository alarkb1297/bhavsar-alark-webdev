var mongoose = require('mongoose');
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model("WidgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
module.exports = widgetModel;

function createWidget(pageID, widget) {
    widget._page = pageID;
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageID) {
    return widgetModel
        .find({_page: pageID})
        .populate('_page', ['name'])
        .exec();
}

function findWidgetById(widgetID) {
    return widgetModel.findById(widgetID);
}

function updateWidget(widgetID, widget) {
    return widgetModel.update({_id: widgetID},
        {$set: widget});
}

function deleteWidget(widgetID) {
    return widgetModel.remove({_id: widgetID});
}

function reorderWidget(pageID, start, end) {


    return widgetModel
        .find({_page: pageID}, function (err, widgets) {
            widgets.splice(end, 0, widgets.splice(start, 1)[0]);

            widgets.forEach(function (widget) {
                widget.markModified();
                //widget.save();
                widget.update();
            })
        })


    // return findAllWidgetsForPage(pageID)
    //     .then(function (widgets) {
    //         var widgets = widgets;
    //         console.log("in model");
    //         //console.log(widgets);
    //
    //         widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    //
    //         console.log(widgets);
    //
    //         return findAllWidgetsForPage(pageID);
    //     });


    //widgets.splice(end, 0, widgets.splice(start, 1)[0]);
}
