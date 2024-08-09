import { useEffect } from 'react';

const usePreloadImages = (imageUrls) => {
  useEffect(() => {
    const images = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);
};

export default usePreloadImages;
