const express = require('express');
const Quote = require('../models/Quotes');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/random', async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const randomIndex = Math.floor(Math.random() * count); 
        const randomQuote = await Quote.find().skip(randomIndex).limit(1); 
        res.json(randomQuote[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', async (req, res) => {
    const { quote, author } = req.body;

    const newQuote = new Quote({
        quote,
        author,
    });

    try {
        const savedQuote = await newQuote.save();
        res.status(201).json(savedQuote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
