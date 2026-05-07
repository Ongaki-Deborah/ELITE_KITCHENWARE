import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("default");
    const [search, setSearch] = useState("");

    const productsPerPage = 10;
    const navigate = useNavigate();

    const images_url =
        "https://deborahkiboko.alwaysdata.net/static/images/";

    // 🛒 ADD TO CART
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const index = cart.findIndex((item) => item.id === product.id);

        if (index !== -1) {
            cart[index] = {
                ...cart[index],
                quantity: cart[index].quantity + 1,
            };
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/cart");
    };

    // ❤️ WISHLIST
    const addToWishlist = (product) => {
        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        const exists = wishlist.some((item) => item.id === product.id);

        if (!exists) {
            wishlist = [...wishlist, product];
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }

        navigate("/wishlist");
    };

    // FETCH PRODUCTS
    const getProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                "https://deborahkiboko.alwaysdata.net/api/get_product_details"
            );
            setProducts(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError("Error loading products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // 🔥 RESET PAGE ON SEARCH/SORT (IMPORTANT FIX)
    useEffect(() => {
        setCurrentPage(1);
    }, [search, sortOrder]);

    // SORT
    const sorted = [...products].sort((a, b) => {
        if (sortOrder === "low") return a.product_cost - b.product_cost;
        if (sortOrder === "high") return b.product_cost - a.product_cost;
        return 0;
    });

    // FILTER
    const filtered = sorted.filter((p) =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
    );

    // PAGINATION SAFETY
    const totalPages =
        Math.max(1, Math.ceil(filtered.length / productsPerPage));

    const last = currentPage * productsPerPage;
    const first = last - productsPerPage;
    const current = filtered.slice(first, last);

    // prevent invalid page number
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    return (
        <div className="container-fluid py-4">
            <h3 className="text-center mb-3">🍳 Products</h3>

            {/* SEARCH + SORT */}
            <div className="d-flex justify-content-between mb-3">
                <input
                    className="form-control w-50"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select w-25 ms-2"
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="default">Sort</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                </select>
            </div>

            {/* LOADING / ERROR */}
            {loading && <p className="text-center">Loading...</p>}
            {error && (
                <p className="text-center text-danger">{error}</p>
            )}

            {/* EMPTY STATE */}
            {!loading && current.length === 0 && (
                <p className="text-center">No products found</p>
            )}

            {/* PRODUCTS */}
            <div className="row">
                {current.map((product) => (
                    <div className="col-md-3 mb-3" key={product.id}>
                        <div className="card shadow-sm border-0 h-100">

                            <img
                                src={images_url + product.product_photo}
                                alt={product.product_name}
                                style={{
                                    height: "220px",
                                    objectFit: "cover",
                                }}
                            />

                            <div className="card-body d-flex flex-column">
                                <h5 className="fw-bold">
                                    {product.product_name}
                                </h5>

                                <p className="text-muted small">
                                    {product.product_description}
                                </p>

                                <h6 className="text-success fw-bold">
                                    KES {product.product_cost}
                                </h6>

                                <button
                                    className="btn btn-warning w-100 mt-auto mb-2"
                                    onClick={() => addToCart(product)}
                                >
                                    🛒 Add to Cart
                                </button>

                                <button
                                    className="btn btn-outline-danger w-100"
                                    onClick={() => addToWishlist(product)}
                                >
                                    ❤️ Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="text-center mt-4">
                <button
                    className="btn btn-secondary me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </button>

                <span>
                    Page {currentPage} / {totalPages}
                </span>

                <button
                    className="btn btn-secondary ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GetProducts;