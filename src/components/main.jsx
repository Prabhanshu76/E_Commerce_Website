import React, { useState, useEffect } from "react";
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { getProducts } from './api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts(3); // Fetch 3 products
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <>
      <div className="hero border-1 pb-3">
        <Carousel autoplay>
          {products.map(product => (
            <div key={product.id} style={{ display: 'flex', alignItems: 'center' }}>
              <Link to={"/product/" + product.id}>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  style={{ ...contentStyle, objectFit: 'contain', width: '100%' }}
                />
                <div className="text-bottom">{product.name}</div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Home;
