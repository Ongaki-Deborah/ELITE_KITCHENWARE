import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? "nav-link active fw-bold text-warning border-bottom border-warning"
            : "nav-link text-white fw-medium";

    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    const updateCounts = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        setCartCount(
            cart.reduce((total, item) => total + item.quantity, 0)
        );

        setWishlistCount(wishlist.length);
    };

    useEffect(() => {
        updateCounts();

        const handleChange = () => updateCounts();

        window.addEventListener("storage", handleChange);
        window.addEventListener("focus", handleChange);

        return () => {
            window.removeEventListener("storage", handleChange);
            window.removeEventListener("focus", handleChange);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top py-2">
            <div className="container">

                {/* BRAND */}
                <NavLink
                    to="/"
                    className="navbar-brand fw-bold text-warning fs-4"
                    style={{ letterSpacing: "1px" }}
                >
                    🛍 ELITE KITCHENWARE
                </NavLink>

                {/* TOGGLER */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* LINKS */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

                        <li className="nav-item">
                            <NavLink end to="/" className={linkClass}>
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/signup" className={linkClass}>
                                Sign Up
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/signin" className={linkClass}>
                                Sign In
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/addproduct" className={linkClass}>
                                Add Product
                            </NavLink>
                        </li>

                        {/* ❤️ WISHLIST */}
                        <li className="nav-item">
                            <NavLink
                                to="/wishlist"
                                className="nav-link text-white position-relative fw-medium"
                            >
                                ❤️ Wishlist
                                <span className="badge rounded-pill bg-danger ms-2">
                                    {wishlistCount}
                                </span>
                            </NavLink>
                        </li>

                        {/* 🛒 CART */}
                        <li className="nav-item">
                            <NavLink
                                to="/cart"
                                className="nav-link text-white position-relative fw-medium"
                            >
                                🛒 Cart
                                <span className="badge rounded-pill bg-warning text-dark ms-2">
                                    {cartCount}
                                </span>
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
