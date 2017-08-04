var mongoose = require('mongoose');
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
module.exports = websiteModel;

function createWebsiteForUser(userID, website) {
    website._user = userID;
    return websiteModel.create(website);
}

function findWebsitesForUser(userID) {
    return websiteModel
        .find({_user: userID})
        .populate('_user', ['username'])
        .exec();
}

function findWebsiteById(webID) {
    return websiteModel.findById(webID);
}

function updateWebsite(webID, website) {
    return websiteModel.update({_id: webID},
        {$set: website});
}

function deleteWebsite(webID) {
    return websiteModel.remove({_id: webID});
}
