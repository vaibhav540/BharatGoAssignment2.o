import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [category, setCategory] = useState(""); // State for selected category
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      if (componentMounted) {
        const products = await response.json();
        setData(products);
        setFilter(products);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    filterProducts(query, category);
  };

  const filterProducts = (searchQuery, categoryFilter) => {
    const filteredData = data.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery);
      const matchesCategory = categoryFilter
        ? product.category.name.toLowerCase() === categoryFilter.toLowerCase()
        : true;
      return matchesSearch && matchesCategory;
    });
    setFilter(filteredData);
  };

  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, i) => (
        <div
          className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
          key={`skeleton-${i}`}
        >
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  const ShowProducts = () => (
    <>
      {/* Filter Buttons */}
      <div className="buttons text-center py-5">
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => {
            setCategory("");
            filterProducts(searchTerm, "");
          }}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => {
            setCategory("Clothes");
            filterProducts(searchTerm, "Clothes");
          }}
        >
          Clothes
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => {
            setCategory("Electronics");
            filterProducts(searchTerm, "Electronics");
          }}
        >
          Electronics
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => {
            setCategory("Furniture");
            filterProducts(searchTerm, "Furniture");
          }}
        >
          Furniture
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => {
            setCategory("Shoes");
            filterProducts(searchTerm, "Shoes");
          }}
        >
          Shoes
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => {
            setCategory("Miscellaneous");
            filterProducts(searchTerm, "Miscellaneous");
          }}
        >
          Miscellaneous
        </button>
      </div>

      {/* Product List */}
      {filter.map((product) => (
        <div
          id={product.id}
          key={product.id}
          className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
        >
          <div className="card text-center h-100">
            <img
              className="card-img-top p-3"
              src={product.images[0]}
              alt={product.title}
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">
                {product.title.substring(0, 12)}...
              </h5>
              <p className="card-text">
                {product.description.substring(0, 90)}...
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">$ {product.price}</li>
            </ul>
            <div className="card-body">
              <Link
                to={"/product/" + product.id}
                className="btn btn-dark m-1"
              >
                Buy Now
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>

        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Product Display */}
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
