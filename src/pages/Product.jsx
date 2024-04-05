import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

import Carousel from "react-bootstrap/Carousel";

import { getProductById, getProductsByCategory } from "../components/api"; // Import getProductById function

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starElements = [];

    for (let i = 0; i < fullStars; i++) {
      starElements.push(
        <i className="fa fa-star" key={i} style={{ color: "white" }}></i>
      );
    }

    if (halfStar) {
      starElements.push(
        <i
          className="fa fa-star-half-o"
          key="half"
          style={{ color: "white" }}
        ></i>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <i
          className="fa fa-star-o"
          key={`empty-${i}`}
          style={{ color: "white" }}
        ></i>
      );
    }

    return starElements;
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      try {
        // Fetch product by ID using the getProductById function
        const productData = await getProductById(id);
        setProduct(productData);
        setLoading(false);

        // Log the response from getProductsByCategory
        console.log("Product category:", productData.category);
        const data2 = await getProductsByCategory(productData.category);
        console.log("Similar products data:", data2);
        setSimilarProducts(data2);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
  }, [id]);
  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              <Carousel>
                {product.images &&
                  product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt={`Slide ${index}`}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <div className="col-md-6 col-md-5 py-5">
              <h4 className="text-uppercase text" style={{ color: "#1B2E3C" }}>
                {product.category}
              </h4>

              <h1 className="display-5" style={{ color: "white" }}>
                {product.title}
              </h1>
              <p className="lead">{renderStars(product.rating)}</p>
              <h3 className="display-6  my-4" style={{ color: "white" }}>
                ${product.price}
              </h3>
              <p className="lead" style={{ color: "white" }}>
                {product.description}
              </p>
              <button
                className="btn btn-outline-dark"
                onClick={() => addProduct(product)}
                style={{ color: "white" }}
              >
                Add to Cart
              </button>

              <Link to="/cart" className="btn btn-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <Link
                  to={"/product/" + item.id}
                  className="product-link"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <div
                    key={item.id}
                    className="card mx-4 text-center"
                    style={{ background: "white" }}
                  >
                    <img
                      className="card-img-top p-3"
                      src={item.thumbnail}
                      alt="Card"
                      height={300}
                      width={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: "black" }}>
                        {item.title.substring(0, 20)}
                      </h5>
                    </div>
                    {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                    <div className="card-body">
                      <Link
                        to={"/product/" + item.id}
                        className="btn btn-dark m-1"
                      >
                        Buy Now
                      </Link>
                      <button
                        className="btn btn-dark m-1"
                        onClick={() => addProduct(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="" style={{ color: "white" }}>
              You may also Like
            </h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
