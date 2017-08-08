var mongoose = require('mongoose');
var pageSchema = require("./page.schema.server");
var websiteSchema = require("../website/website.schema.server")
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;
module.exports = pageModel;

function createPage(webID, page) {
    var pageTemp;

    page._website = webID;
    return pageModel.create(page)
        .then(function (pageDoc) {
            pageTemp = pageDoc;
            return websiteModel.addPage(webID, pageDoc._id);
        })
        .then(function (website) {
            return pageTemp;
        })
}

function findAllPagesForWebsite(webID) {
    return pageModel
        .find({_website: webID})
        .populate('_website', ['name'])
        .exec();
}

function findPageById(pageID) {
    return pageModel.findById(pageID);
}

function updatePage(pageID, page) {
    return pageModel.update({_id: pageID},
        {$set: page});
}

function deletePage(pageID) {

    var webID;

    return pageModel
        .findPageById(pageID)
        .then(function (page) {
            webID = page._website;
            return websiteModel.removePage(webID, pageID)
        })
        .then(function (website) {
            return pageModel.remove({_id: pageID});
        });
}

function addWidget(pageID, widgetID) {
    return pageModel
        .findById(pageID)
        .then(function (page) {
            page.widgets.push(widgetID);
            return page.save();
        });
}

function removeWidget(pageID, widgetID) {
    return pageModel
        .findById(pageID)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetID);
            page.widgets.splice(index, 1);
            return page.save();
        });
}
