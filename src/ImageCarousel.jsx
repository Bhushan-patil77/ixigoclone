import React, { useState, useEffect } from 'react';


const Carousel = ({images}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleScroll = () => {
    const slideWidth = 300; // Fixed width of each slide
    const slideThreshold = currentImage * slideWidth;

    if (window.scrollX >= slideThreshold + slideWidth / 2) {
      setCurrentImage(currentImage + 1);
    } else if (window.scrollX < slideThreshold - slideWidth / 2) {
      setCurrentImage(currentImage - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentImage]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-300 h-200 bg-cover bg-center transition-transform duration-500 ${
              index === currentImage
                ? 'transform translate-x-0'
                : index < currentImage
                ? '-translate-x-full'
                : 'translate-x-full'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full mx-2 cursor-pointer ${
              index === currentImage ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentImage(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
