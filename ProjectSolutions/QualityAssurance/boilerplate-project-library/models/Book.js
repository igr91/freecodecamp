const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
	title: { type: String, required: true },
	comments: { type: [String], required: true },
	commentcount: { type: Number, required: true },
});

const Book = mongoose.model("Book", BookSchema);

exports.Book = Book;