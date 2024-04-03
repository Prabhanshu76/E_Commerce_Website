import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import Search from './Search';
import { getProducts, filterProducts, getCategories, getProductsByCategory } from './api'; // Importing API functions

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await getProducts();
      const categories = await getCategories();
      console.log(categories); // Log categories here
      if (componentMounted) {
        setData(products);
        setFilter(products);
        setCategories(categories);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      componentMounted = false;
    };
  }, []);

  const filterProduct = async (searchTerm) => {
    setLoading(true);
    const filteredProducts = await filterProducts(searchTerm);
    setFilter(filteredProducts);
    setLoading(false);
  };

  const showAllProducts = () => {
    setFilter([...data]);
  };

  const filterByCategory = async (category) => {
    setLoading(true);
    const products = await getProductsByCategory(category);
    setFilter(products);
    setLoading(false);
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return (originalPrice - discountAmount).toFixed(2);
};

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
        starElements.push(<i className="fa fa-star" key={i}></i>);
    }

    if (halfStar) {
        starElements.push(<i className="fa fa-star-half-o" key="half"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
        starElements.push(<i className="fa fa-star-o" key={`empty-${i}`}></i>);
    }

    return starElements;
};


const ShowProducts = () => {
  return (
      <>
          <div className="buttons text-center py-5">
              <button className="btn btn-outline-dark btn-sm m-2" onClick={showAllProducts}>
                  All
              </button>
              {categories && categories.map((category, index) => (
                  <button key={index} className="btn btn-outline-dark btn-sm m-2" onClick={() => filterByCategory(category)}>
                      {category}
                  </button>
              ))}
          </div>

          {filter.map((product) => (
              <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <Link to={"/product/" + product.id} className="product-link"> {/* Link to product page */}
                      <div className="card text-center h-100" key={product.id}>
                          <img className="card-img-top p-3" src={product.thumbnail} alt="Card" height={300} />
                          <div className="card-body">
                              <h5 className="card-title">{product.title.substring(0, 40)}</h5>
                          </div>
                          <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                  <span className="lead">
                                      <span className="text-success mr-2">${calculateDiscountedPrice(product.price, product.discountPercentage)}</span>
                                      <s className="text-muted small "><b>${product.price}</b></s>
                                      <span className="text-success ml-2 small">({product.discountPercentage}% off)</span>
                                  </span>
                              </li>
                              <li className="list-group-item">
                                  <div className="rating">
                                      {renderStars(product.rating)}
                                  </div>
                              </li>
                          </ul>
                          <div className="card-body">
                              <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                                  Add to Cart
                              </button>
                          </div>
                      </div>
                  </Link>
              </div>
          ))}
      </>
  );
};

 

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" key={index}>
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <Search filterProduct={filterProduct} />
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
