import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
});

const Quote = mongoose.model('Quote', quoteSchema);

async function seedQuotes() {
  try {
    const quotes = [
      { quote: 'no pain no gain' },
      { quote: 'A year from now you may wish you had started today.' },
      { quote: 'Look in the mirror. That’s your competition.' },
      {
        quote:
          "Whether you think you can, or you think you can't, you're right",
      },
      { quote: 'Get comfortable with being uncomfortable!' },
    ];

    await Quote.insertMany(quotes, (err, savedQuotes) => {
      if (err) {
        console.error(err);
      } else {
        console.log(savedQuotes);
      }
    });
    const checkQuotes = await Quote.find({});
    console.log(checkQuotes);
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteQuotes() {
  try {
    await Quote.deleteMany({});
    const checkQuotes = await Quote.find({});
    console.log(checkQuotes);
  } catch (error) {
    console.log(error.message);
  }
}

export default Quote;
export { seedQuotes, deleteQuotes };
