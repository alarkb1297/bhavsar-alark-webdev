var mongoose = require('mongoose');
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;

function createPage(webID, page) {
    page._website = webID;
    return pageModel.create(page);
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
    return pageModel.remove({_id: pageID});
}
