const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Книга не найдена' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { title, author, description } = req.body;

    // Проверка наличия необходимых полей
    if (!title || !author || !description) {
        return res.status(400).json({ message: 'Необходимо заполнить все поля книги' });
    }

    try {
        const newBook = await Book.create({
            title,
            author,
            description
        });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Маршрут для обновления информации о книге по ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,
            author,
            description
        }, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Маршрут для удаления книги по ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
