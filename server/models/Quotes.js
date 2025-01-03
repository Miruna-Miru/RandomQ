const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quote: { type: String, required: true },
    author: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', quoteSchema);
