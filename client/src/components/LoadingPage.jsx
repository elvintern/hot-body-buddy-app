import React, { useState, useEffect } from 'react';

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);

  const landscape = Object.values(
    import.meta.glob(
      '../assets/loadingImages/landscape*.{png,jpg,jpeg,PNG,JPEG}',
      {
        eager: true,
        as: 'url',
      }
    )
  );
  const portrait = Object.values(
    import.meta.glob(
      '../assets/loadingImages/portrait*.{png,jpg,jpeg,PNG,JPEG}',
      {
        eager: true,
        as: 'url',
      }
    )
  );

  console.log(portrait, landscape);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('change');
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className="loading-image"
          style={{
            background: `url('${portrait[1]}') center/cover`,
          }}
        >
          hello
        </div>
      ) : (
        <p>Content loaded!</p>
      )}
    </>
  );
}

export default LoadingPage;
