import cloudinary from '../lib/cloudinary.js';
import Book from '../models/book.model.js';

export const createBook = async (req, res) => {
    try {
        const { title, caption, rating, image } = req.body;

        if (!title || !caption || !rating || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // upload image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image)

        // get the secured url from the response
        const imageUrl = uploadResponse.secure_url

        // save to the database
        const newBook = new Book({ title, caption, rating, image: imageUrl, user: req.user._id });
        await newBook.save();

        if (!newBook) return res.status(400).json({ message: "Failed to create book" });

        return res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        console.log("Error in create book route", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getBooks = async (req, res) => {
    // example call from react native - frontend
    //const response = await fetch("http://localhost:3000/api/books?page=1&limit=5")
    try {
        // pagination => infinite scroll
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page - 1) * limit;

        const books = await Book.find()
            .sort({ createdAt: -1 }) // descending order
            .skip(skip)
            .limit(limit)
            .populate("user", "username profileImage")

        if (books.length < 1) res.status(404).json({ message: "No books found" });

        const totalBooks = await Book.countDocuments();

        res.send({
            books,
            totalBooks,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        })
    } catch (error) {
        console.log("Error in getting all books", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getBooksByUser = async (req, res) => {
    try {
        const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(books)
    } catch (error) {
        console.error("Error in getting user books", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ message: "Book not found" });

        // check if the user is creator of the book
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // delete the image from cloudinary as well
        if (book.image && book.image.includes("cloudinary")) {
            try {
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.log("Error in deleting image from cloudinary", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }

        await book.deleteOne();

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log("Error in delete book route", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}