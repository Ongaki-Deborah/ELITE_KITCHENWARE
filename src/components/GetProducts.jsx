import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("default");
    const [search, setSearch] = useState("");

    const productsPerPage = 10;
    const navigate = useNavigate();
    const images_url = "https://deborahkiboko.alwaysdata.net/static/images/";

    // ❤️ WISHLIST FUNCTION
    const addToWishlist = (product) => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const exists = wishlist.find((item) => item.id === product.id);

        if (!exists) {
            wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert("❤️ Added to wishlist!");
        } else {
            alert("⚠️ Already in wishlist");
        }
    };

    const getProducts = async () => {
        setLoading("Loading...");
        try {
            const res = await axios.get(
                "https://deborahkiboko.alwaysdata.net/api/get_product_details"
            );
            setProducts(res.data);
            setLoading("");
        } catch (err) {
            setLoading("");
            setError("Error loading products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // SORT
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low") return a.product_cost - b.product_cost;
        if (sortOrder === "high") return b.product_cost - a.product_cost;
        return 0;
    });

    // FILTER
    const filteredProducts = sortedProducts.filter((product) =>
        product.product_name.toLowerCase().includes(search) ||
        product.product_description?.toLowerCase().includes(search)
    );

    // PAGINATION
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div
            className="container-fluid py-4"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
            }}
        >
            {/* HEADER */}
            <h3 className="text-center mb-4 text-light fw-bold">
                🍳 Kitchen Products
            </h3>

            {/* SEARCH + SORT */}
            <div className="d-flex justify-content-between mb-3">

                <input
                    type="text"
                    className="form-control w-50 bg-dark text-light border-0"
                    placeholder="🔍 Search products..."
                    onChange={(e) => {
                        setSearch(e.target.value.toLowerCase());
                        setCurrentPage(1);
                    }}
                />

                <select
                    className="form-select w-auto ms-2 bg-dark text-light border-0"
                    onChange={(e) => {
                        setSortOrder(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="default">Sort by Price</option>
                    <option value="low">Low → High</option>
                    <option value="high">High → Low</option>
                </select>

            </div>

            {/* LOADING */}
            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-info"></div>
                </div>
            )}

            {/* ERROR */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* PRODUCTS */}
            <div className="row">
                {currentProducts.map((product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <div
                            className="card border-0 h-100"
                            style={{
                                borderRadius: "15px",
                                background: "#ffffff",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                            }}
                        >
                            <img
                                src={images_url + product.product_photo}
                                className="card-img-top"
                                style={{
                                    height: "200px",
                                    objectFit: "cover",
                                    borderTopLeftRadius: "15px",
                                    borderTopRightRadius: "15px",
                                }}
                                alt="product"
                            />

                            <div className="card-body text-center">
                                <h5 style={{ color: "#2E2E2E" }}>
                                    {product.product_name}
                                </h5>

                                <p className="text-muted small">
                                    {product.product_description}
                                </p>

                                <h6 style={{ color: "#00BFA6", fontWeight: "bold" }}>
                                    KES {product.product_cost.toLocaleString()}
                                </h6>

                                {/* BUY NOW */}
                                <button
                                    className="btn w-100 mt-2 fw-bold"
                                    style={{
                                        background: "#00E5FF",
                                        color: "#003344",
                                        borderRadius: "25px",
                                        boxShadow: "0 0 10px #00E5FF",
                                    }}
                                    onClick={() =>
                                        navigate("/mpesapayment", {
                                            state: { product },
                                        })
                                    }
                                >
                                    Buy Now
                                </button>

                                {/* ❤️ WISHLIST */}
                                <button
                                    className="btn btn-outline-danger w-100 mt-2 fw-bold"
                                    style={{ borderRadius: "25px" }}
                                    onClick={() => addToWishlist(product)}
                                >
                                    ❤️ Add to Wishlist
                                </button >
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* NO RESULTS */}
            {currentProducts.length === 0 && !loading && (
                <p className="text-center text-light mt-4">
                    😢 No products found
                </p>
            )}

            {/* PAGINATION */}
            <div className="d-flex justify-content-center gap-3 mt-4">

                <button
                    className="btn btn-dark"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>

                <span className="align-self-center text-light">
                    Page {currentPage} of {totalPages || 1}
                </span>

                <button
                    className="btn btn-dark"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>

            </div>
        </div>
    );
};

export default GetProducts;