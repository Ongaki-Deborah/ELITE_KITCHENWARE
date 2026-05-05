import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const linkClass = ({ isActive }) =>
        isActive ? 'nav-link active fw-semibold text-success' : 'nav-link';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container">
                <NavLink to="/" className="navbar-brand fw-bold text-primary">
                    ELITEKITCHENWARE
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
                        <li className="nav-item">
                            <NavLink to="/WishList" className={linkClass}>
                                Wish List
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;