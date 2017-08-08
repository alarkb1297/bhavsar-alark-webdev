var mongoose = require('mongoose');
var websiteSchema = require("./website.schema.server");
var userSchema = require("../user/user.schema.server");
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = mongoose.model("UserModel", userSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;
module.exports = websiteModel;

function createWebsiteForUser(userID, website) {
    var websiteTemp;

    website._user = userID;
    return websiteModel.create(website)
        .then(function (websiteDoc) {
            websiteTemp = websiteDoc;
            return userModel.addWebsite(userID, websiteDoc._id);
        })
        .then(function (user) {
            return websiteTemp;
        });
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

    var userID;

    return websiteModel
        .findWebsiteById(webID)
        .then(function (website) {
            console.log(website);
            userID = website._user;
            return userModel.removeWebsite(userID, webID);
        })
        .then(function (user) {
            return websiteModel.remove({_id: webID});
        })

}

function addPage(webID, pageID) {
    return websiteModel
        .findById(webID)
        .then(function (website) {
            website.pages.push(pageID);
            return website.save();
        });
}

function removePage(webID, pageID) {
    return websiteModel
        .findById(webID)
        .then(function (website) {
            var index = website.pages.indexOf(pageID);
            website.pages.splice(index, 1);
            return website.save();
        });
}
