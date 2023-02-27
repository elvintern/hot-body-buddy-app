import React, { useEffect, useState } from 'react';
import './Quote.scss';

export default function Quote() {
  const [quote, setQuote] = useState({});

  // useEffect(() => {
  //   fetchQuotes()
  //     .then((quotes) => {
  //       let randNum = Math.floor(Math.random() * quotes.length);
  //       setQuote(quotes[randNum]);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  return (
    <>
      {quote ? (
        <h1 className="quote">{quote.quote}</h1>
      ) : (
        <h1 className="quote">Loading...</h1>
      )}
    </>
  );
}
