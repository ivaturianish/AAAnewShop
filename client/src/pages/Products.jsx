"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import "./Products.css";
import SearchBar from "../components/layout/Searchbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 3 rows of 4 products each

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setTimeout(() => {
          // Sample data for demonstration
          const sampleProducts = Array.from({ length: 100 }, (_, index) => ({
            _id: (index + 1).toString(),
            name: `Product ${index + 1}`,
            image: "https://via.placeholder.com/300",
            description: `Description for product ${index + 1}`,
            price: (index + 1) * 10,
            countInStock: 10,
            rating: 4.0,
            numReviews: 5,
          }));

          setProducts(sampleProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle "Go to Page" functionality
  const handleGoToPage = (event) => {
    event.preventDefault();
    const pageInput = event.target.elements.pageNumber.value;
    const pageNumber = parseInt(pageInput, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AAA</h1>
          <p>Discover amazing products at great prices</p>
        </div>
      </section>
      <SearchBar />
      <section className="all-products">
        <h2>All Products</h2>
        <div className="products-grid">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="pagination">
          <button
            className="prev"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          ))}
          <button
            className="next"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <form className="go-to-page" onSubmit={handleGoToPage}>
            <input
              type="number"
              name="pageNumber"
              min="1"
              max={totalPages}
              placeholder="Go to Page"
            />
            <button type="submit">Go</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Products;
