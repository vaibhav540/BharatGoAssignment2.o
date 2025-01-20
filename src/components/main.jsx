import React, { useState, useEffect } from "react";
import '../pages/Home'; // Import custom CSS for styles

const images = [
  "https://www.seasonsway.com/images1webp/destinationpage/online_shopping_sites_india.webp",
  "https://img.lovepik.com/photo/40027/7318.jpg_wh300.jpg",
  "https://cdn.chic.ae/uploads/Top-5-Online-Shopping-Website-in-Dubai-UAE-2022-1.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/010/106/778/small_2x/shopping-list-people-illustration-with-smartphone-vector.jpg",
  "https://static-web.upmetrics.co/wp-content/uploads/2022/07/online-shopping-website.png",
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="hero border-1 pb-3">
      <div className="card bg-dark text-white border-0 mx-3">
        <img
          className="card-img img-fluid responsive-image"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
        />
        <div className="card-img-overlay d-flex align-items-center justify-content-center">
          {/* <h1 className="card-title fs-1 text fw-lighter text-center">
            Explore Online Shopping
          </h1> */}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              height: "10px",
              width: "10px",
              backgroundColor: currentIndex === index ? "#fff" : "#888",
              borderRadius: "50%",
              margin: "0 5px",
              cursor: "pointer",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
