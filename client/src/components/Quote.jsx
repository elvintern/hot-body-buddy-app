import React, { useEffect, useState } from 'react';

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
      <h1 className="heading heading--primary heading--primary--quote">
        {quote ? quote.quote : 'Loading...'}
      </h1>
    </>
  );
}
