import React, { useEffect, useState } from 'react';
import '../3DImageGallery/ThreeDImageGallery.css';

const ThreeDImageGallery = () => {
  const images = [
    { src: "/assets/img/3D/3d-icon-traveling-vacation_23-2151037395.jpg", description: "Continents" },
    { src: "/assets/img/3D/3d-icon-traveling-vacation_23-2151037399.jpg", description: "Africa" },
    { src: "/assets/img/3D/3d-puzzle-with-sea-landscape_23-2151145002.jpg", description: "Landmarks" },
    { src: "/assets/img/3D/beautiful-landscape-from-magazine-coming-life_23-2151158579.jpg", description: "Geographical Features" },
    { src: "/assets/img/3D/map_879987-40396.jpg", description: "Geographical Features" },
    { src: "/assets/img/3D/mr.jpg", description: "Geographical Features" },
    { src: "/assets/img/3D/pointers-direction-gps-navigation-world-map_1199132-137831.jpg", description: "Geographical Features" },
    { src: "/assets/img/3D/red-pin-map-map_118124-185728.jpg", description: "Geographical Features" },
    { src: "/assets/img/3D/stylized-3d-treasure-map-leading-chest-fools-gold_950002-654314.jpg", description: "Geographical Features" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="wrapper">
      <div className="inner-containers">
        {images.map((image, index) => (
          <div
            className={`inner-container ${index === currentIndex ? 'active' : ''}`}
            key={index}
            style={{ backgroundImage: `url(${image.src})` }}
            tabIndex="0"
          />
        ))}
      </div>
    </div>
  );
};

export default ThreeDImageGallery;
