const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quote = require('./models/Quotes'); 

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

const seedQuotes = async () => {
    const quotes = [
        {
            quote: "The purpose of our lives is to be happy.",
            author: "Dalai Lama"
        },
        {
            quote: "Get busy living or get busy dying.",
            author: "Stephen King"
        },
        {
            quote: "You only live once, but if you do it right, once is enough.",
            author: "Mae West"
        }
    ];

    try {
        await Quote.insertMany(quotes);
        console.log("Quotes added to the database!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding quotes:", error);
    }
};

seedQuotes();
