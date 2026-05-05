import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () => {
        const data = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(data);
    };

    // ❌ Remove item
    const removeItem = (id) => {
        const updated = wishlist.filter((item) => item.id !== id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    return (
        <div className="container py-4">
            <h3 className="text-center mb-4">❤️ My Wishlist</h3>

            {wishlist.length === 0 ? (
                <p className="text-center">No items in wishlist</p>
            ) : (
                <div className="row">
                    {wishlist.map((item) => (
                        <div key={item.id} className="col-md-3 mb-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src={
                                        "https://deborahkiboko.alwaysdata.net/static/images/" +
                                        item.product_photo
                                    }
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                    alt="product"
                                />

                                <div className="card-body text-center">
                                    <h5>{item.product_name}</h5>

                                    <p className="text-muted small">
                                        {item.product_description}
                                    </p>

                                    <h6>
                                        KES {item.product_cost.toLocaleString()}
                                    </h6>

                                    <button
                                        className="btn btn-danger btn-sm w-100 mt-2"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;