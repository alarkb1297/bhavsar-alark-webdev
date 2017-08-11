var mongoose = require('mongoose');
var bookSchema = require("./book.schema.server");
var bookModel = mongoose.model("ProjectBookModel", bookSchema);
var userSchema = require("../user/user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);

bookModel.createBook = createBook;
bookModel.findBookById = findBookById;
bookModel.updateBook = updateBook;
bookModel.findBookByTitle = findBookByTitle;
bookModel.findBookByVolumeId = findBookByVolumeId;
bookModel.deleteBook = deleteBook;
module.exports = bookModel;

function createBook(userID, book) {
    return bookModel
        .findBookByVolumeId(book.volumeID)
        .then(function (response) {
            if (response) {
                return userService.addBookToBookShelf(userID, book);
            } else {
                bookModel.create(book);
                return userService.addBookToBookShelf(userID, book);
            }
        })
}

function findBookById(bookID) {
    return bookModel.findById(bookID);
}

function findBookByVolumeId(volumeID) {
    return bookModel.findOne({volumeID: volumeID});
}

function updateBook(bookID, book) {
    return bookModel.update({_id: bookID},
        {$set: book});
}

function findBookByTitle(title) {
    return bookModel.findOne({title: title});
}

function deleteBook(bookID) {
    return bookModel.remove({_id: bookID});
}
