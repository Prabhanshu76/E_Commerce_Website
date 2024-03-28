import React from "react";
import { Carousel } from 'antd';

const Home = () => {
  const contentStyle = {
    height: '500px', // Adjust height as needed
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    display: 'flex',
    justifyContent: 'center', // Horizontally center the content
    alignItems: 'center' // Vertically center the content
  };

  return (
    <>
      <div className="hero border-1 pb-3">
        <Carousel autoplay>
          <div>
            <img
              src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
              alt="Slide 1"
              style={{ ...contentStyle, objectFit: 'cover', width: '100%' }}
            />
          </div>
          <div>
            <h3 style={contentStyle}>Slide 2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>Slide 3</h3>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Home;
