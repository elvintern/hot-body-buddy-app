import React, { useState, useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(null);

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setLoadingImage(landscape[Math.floor(Math.random() * landscape.length)]);
    } else {
      setLoadingImage(portrait[Math.floor(Math.random() * portrait.length)]);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      {isLoading && (
        <div
          className="loading-image"
          style={{
            background: `url('${loadingImage}') center/cover`,
          }}
        >
          <LoadingIcons.BallTriangle className="loading-icon" width={'50rem'} />
        </div>
      )}
    </>
  );
}

export default LoadingPage;
