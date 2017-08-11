var app = require("../../express");
var bookModel = require("../model/book/book.model.server");
var passport       = require('passport');


app.post("/api/project/user/:userID/book", createBook);

function createBook(req, response) {

    var book = req.body;

    var userID = req.params.userID;

    bookModel
        .addBookToBookShelf(userID, book)
        .then(function (book) {
            response.json(book);
            return;
        });

}
