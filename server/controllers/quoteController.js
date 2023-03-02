import Quote from '../mongodb/models/quote.js';

// get a random quote
const getQuote = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    let randNum = Math.floor(Math.random() * quotes.length);
    res.status(200).json(quotes[randNum]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default getQuote;
