import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import Search from "./Search";
import {
  getProducts,
  filterProducts,
  getCategories,
  getProductsByCategory,
} from "./api"; // Importing API functions

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await getProducts(0);
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
    setSelectedCategory(null); // Deselect category
  };

  const filterByCategory = async (category) => {
    setLoading(true);
    const products = await getProductsByCategory(category);
    setFilter(products);
    setLoading(false);
    setSelectedCategory(category); // Set selected category
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return (originalPrice - discountAmount).toFixed(2);
  };

  const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
    const originalPrice = discountedPrice / (1 - discountPercentage / 100);
    return originalPrice.toFixed(2);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      starElements.push(
        <i className="fa fa-star" key={i} style={{ color: "black" }}></i>
      );
    }

    if (halfStar) {
      starElements.push(
        <i
          className="fa fa-star-half-o"
          key="half"
          style={{ color: "black" }}
        ></i>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <i
          className="fa fa-star-o"
          key={`empty-${i}`}
          style={{ color: "black" }}
        ></i>
      );
    }

    return starElements;
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

  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => (
          <div
            id={product.id}
            key={product.id}
            className="col-md-3 col-sm-4 col-xs-6 col-12 mb-4"
          >
            <div
              className="card text-center h-100"
              key={product.id}
              style={{
                background: "white",
                transition: "transform 0.3s", // Add transition for smooth animation
                transformOrigin: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Link
                to={"/product/" + product.id}
                className="product-link"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  className="card-img-top p-3"
                  src={product.thumbnail}
                  alt="Card"
                  height={220}
                  style={{ background: "#f5f5f5" }}
                />
                <div className="card-body">
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      display: "block",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.title.substring(0, 40)}
                  </span>
                </div>
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item"
                    style={{ background: "white" }}
                  >
                    <span className="lead">
                      <span className="text-success mr-2">
                        ${product.price}
                      </span>
                      <span
                        className="small"
                        style={{
                          fontSize: "12px",
                          color: "black",
                          textDecoration: "line-through",
                        }}
                      >
                        <b>
                          $
                          {calculateOriginalPrice(
                            product.price,
                            product.discountPercentage
                          )}
                        </b>
                      </span>
                      <span
                        className="text-success ml-2 small"
                        style={{ fontSize: "15px" }}
                      >
                        ({product.discountPercentage}% off)
                      </span>
                    </span>
                  </li>
                  <li
                    className="list-group-item"
                    style={{ background: "white" }}
                  >
                    <div className="rating" style={{ background: "white" }}>
                      {renderStars(product.rating)}
                    </div>
                  </li>
                </ul>
              </Link>
              <div className="card-body"></div>
            </div>
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
            <h2 className="display-5 text-center" style={{ color: "white" }}>
              Latest Products
            </h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <Search filterProduct={filterProduct} />
          <div className="buttons text-center py-5">
            <button
              className="btn btn-outline-dark btn-sm m-2"
              onClick={showAllProducts}
              style={
                selectedCategory === null
                  ? { color: "white", backgroundColor: "#343a40" }
                  : { color: "white" }
              }
            >
              All
            </button>
            {categories &&
              categories.map((category, index) => (
                <button
                  key={index}
                  className="btn btn-outline-dark btn-sm m-2"
                  onClick={() => filterByCategory(category)}
                  style={
                    selectedCategory === category
                      ? { color: "white", backgroundColor: "#343a40" }
                      : { color: "white" }
                  }
                >
                  {category}
                </button>
              ))}
          </div>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
