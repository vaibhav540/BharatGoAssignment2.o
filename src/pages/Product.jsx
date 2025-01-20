import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Add product to cart (dummy function)
  const addProduct = (product) => {
    console.log("Added to cart:", product);
  };

  // Render product details
  const renderProductDetails = () => {
    if (!product) return <p>Loading product details...</p>;

    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product?.images?.[0] || ""}
              alt={product?.title || "Product"}
              width="400px"
              height="400px"
              loading="lazy"
            />
          </div>
          <div className="col-md-6 py-5">
            <h4 className="text-uppercase text-muted">
              {product?.category?.name || "No category"}
            </h4>
            <h1 className="display-5">{product?.title}</h1>
            <p className="lead">
              Price: ${product?.price || "N/A"}
            </p>
            <h3 className="display-6 my-4">{product?.description}</h3>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderProductDetails()}</div>;
};

export default ShowProduct;
