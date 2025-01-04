import React, { useEffect, useState } from 'react';
import './Quote.css';
import { FaWhatsapp, FaPlus, FaSync } from 'react-icons/fa';

const Quote = () => {
    const [quoteData, setQuoteData] = useState({
        quote: "Loading...",
        author: "",
        timestamp: new Date().toLocaleString(),
    });
    const [showForm, setShowForm] = useState(false);
    const [newQuote, setNewQuote] = useState({ quote: "", author: "" });

    // Fetch random quote from API
    const fetchRandomQuote = async () => {
        try {
            const response = await fetch('https://randomq.onrender.com/api/quotes/random');
            const data = await response.json();
            setQuoteData({
                quote: data.quote,
                author: data.author,
                timestamp: new Date(data.timestamp).toLocaleString(),
            });
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    
    const shareOnWhatsapp = () => {
        const message = `${quoteData.quote} - ${quoteData.author}`;
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    };

    
    const handleAddQuote = async (e) => {
        e.preventDefault();
        if (newQuote.quote && newQuote.author) {
            try {
                const response = await fetch('https://randomq.onrender.com/api/quotes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newQuote),
                });
                if (response.ok) {
                    alert('Quote added successfully!');
                    setNewQuote({ quote: "", author: "" });
                    setShowForm(false);
                } else {
                    alert('Failed to add quote.');
                }
            } catch (error) {
                console.error('Error adding quote:', error);
            }
        }
    };

    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return (
        <div className="quote-container">
            <p className='get-buddy'>Quote of the Moment</p>
            <div className="quote-box">
                <p className="quote-text">{quoteData.quote}</p>
                <p className="quote-author">- {quoteData.author}</p>
                <p className="quote-time">{quoteData.timestamp}</p>
            </div>

            
            <div className="floating-buttons">
                <button className="floating-button whatsapp-button" onClick={shareOnWhatsapp}>
                    <FaWhatsapp />
                </button>
                <button className="floating-button add-quote-button" onClick={() => setShowForm(true)}>
                    <FaPlus />
                </button>
                <button className="floating-button refresh-button" onClick={fetchRandomQuote}>
                    <FaSync />
                </button>
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className='add-new'>Got a Quote? Share It!</h2>
                        <form onSubmit={handleAddQuote}>
                            <div className="form-group">
                                <label>Quote:</label>
                                <textarea
                                    value={newQuote.quote}
                                    onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Author:</label>
                                <input
                                    type="text"
                                    value={newQuote.author}
                                    onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">Add Quote</button>
                                <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quote;
