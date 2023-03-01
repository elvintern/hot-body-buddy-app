import Quote from '../mongodb/models/quote.js';

// get all quotes
const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    console.log(quotes);
    res.status(200).json(quotes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single quote

export { getQuotes };
