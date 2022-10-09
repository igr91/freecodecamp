'use strict';

const Book = require("../models/Book.js").Book;

module.exports = function (app) {

    app.route('/api/books')
        .get(function (req, res) {
            Book.find().exec((e, data) => {
                return res.json(data);
            })
        })

        .post(function (req, res) {
            const title = req.body.title;
            if (title == null) {
                return res.send("missing required field title");
            }

            Book.find({ "title": title }).exec((e, data) => {
                if (data.length > 0) {
                    return res.send("book already exists");
                }

                const newBook = new Book({
                    title: title,
                    comments: [],
                    commentcount: 0
                })

                newBook.save((e, result) => {
                    if (!result) {
                        return res.json({ error: 'could not save data' })
                    } else {
                        return res.json(result);
                    }
                })
            })
        })

        .delete(async function (req, res) {
            await Book.deleteMany({});
            return res.send("complete delete successful");
        });

    app.route('/api/books/:id')
        .get(function (req, res) {
            const id = req.params.id;
            Book.findById(id).exec((e, dataBook) => {
                if (!dataBook) {
                    return res.send("no book exists");
                }
                return res.json(dataBook);
            })
        })

        .post(async function (req, res) {
            const id = req.params.id;
            const comment = req.body.comment;
            if (!comment) {
                return res.send("missing required field comment");
            }
            const book = await Book.findById(id);
            if (!book) {
                return res.send("no book exists");
            }
            book.comments.push(comment);
            book.commentcount = book.comments.length;
            book.save((e, data) => {
                return res.json(data);
            })
        })

        .delete(async function (req, res) {
            const id = req.params.id;

            Book.findById(id).exec(async (e, dataBook) => {
                if (!dataBook) {
                    return res.send("no book exists");
                }
                await Book.deleteOne({ '_id': id });
                return res.send("delete successful");
            })

        });

};
