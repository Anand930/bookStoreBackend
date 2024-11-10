import Book from "../model/book.model.js";

export const getBook = async(req,res) =>{
    try {
        const book = await Book.find()
        res.status(200).json(book)
        console.log("done");
    } catch (error) {
        console.log("Error");
        
        res.status(500).json(error)
    }
}