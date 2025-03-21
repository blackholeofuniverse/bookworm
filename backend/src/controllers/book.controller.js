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

// export const getBooks = async (req, res) => {
//     try {
//         const books = await Book.find();

//         if (books.length < 1) res.status(404).json({ message: "No books found" });

//         return res.status(200).json({ message: "Books fetched successfully", books });
//     } catch (error) {
//         console.log("Error in getBooks route", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }