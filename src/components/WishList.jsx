import React, { useEffect, useState } from "react";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    // 📦 LOAD WISHLIST
    const loadWishlist = () => {
        try {
            const data =
                JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlist(data);
        } catch (error) {
            setWishlist([]);
        }
    };

    useEffect(() => {
        loadWishlist();

        // 🔄 auto-sync across tabs/pages
        const syncWishlist = () => loadWishlist();

        window.addEventListener("storage", syncWishlist);
        window.addEventListener("focus", syncWishlist);

        return () => {
            window.removeEventListener("storage", syncWishlist);
            window.removeEventListener("focus", syncWishlist);
        };
    }, []);

    // ❌ REMOVE ITEM
    const removeItem = (id) => {
        const updated = wishlist.filter((item) => item.id !== id);

        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    // 📊 TOTAL ITEMS
    const totalItems = wishlist.length;

    return (
        <div className="container py-4">

            {/* HEADER */}
            <h3 className="text-center mb-2">
                ❤️ My Wishlist
            </h3>

            {/* ITEM COUNT */}
            <p className="text-center text-muted mb-4">
                You have{" "}
                <span className="fw-bold text-danger">
                    {totalItems}
                </span>{" "}
                item(s) in your wishlist
            </p>

            {/* EMPTY STATE */}
            {wishlist.length === 0 ? (
                <div className="text-center py-5">
                    <h4>❤️ Your wishlist is empty</h4>
                    <p className="text-muted">
                        Start adding products you love
                    </p>
                </div>
            ) : (
                <div className="row">

                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className="col-md-3 mb-4"
                        >

                            <div className="card shadow-sm h-100">

                                <img
                                    src={
                                        "https://deborahkiboko.alwaysdata.net/static/images/" +
                                        item.product_photo
                                    }
                                    alt={item.product_name}
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />

                                <div className="card-body d-flex flex-column text-center">

                                    <h5 className="fw-bold">
                                        {item.product_name}
                                    </h5>

                                    <p className="text-muted small">
                                        {item.product_description}
                                    </p>

                                    <h6 className="text-success">
                                        KES{" "}
                                        {Number(
                                            item.product_cost
                                        ).toLocaleString()}
                                    </h6>

                                    <button
                                        className="btn btn-danger btn-sm w-100 mt-auto"
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
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