var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({

    _website: {type: mongoose.Schema.ObjectId, ref: "WebsiteModel"},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now()}

}, {collection: "page"});

module.exports = pageSchema;
