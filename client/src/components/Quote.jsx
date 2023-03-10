import React, { useEffect, useState } from 'react';
import './Quote.scss';

export default function Quote() {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    fetch('http://localhost:9000/api/v1/quote')
      .then((response) => response.json())
      .then((quote) => {
        setQuote(quote);
      })
      .catch((error) => console.error(error));
  }, []);

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
