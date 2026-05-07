import React, { useEffect, useState } from "react";

const Cart = () => {
    const [cart, setCart] = useState([]);

    // 📦 LOAD CART SAFELY
    const loadCart = () => {
        try {
            const data = JSON.parse(localStorage.getItem("cart")) || [];
            setCart(data);
        } catch (error) {
            setCart([]);
        }
    };

    useEffect(() => {
        loadCart();

        // 🔄 sync when cart changes elsewhere
        const syncCart = () => loadCart();

        window.addEventListener("storage", syncCart);
        window.addEventListener("focus", syncCart);

        return () => {
            window.removeEventListener("storage", syncCart);
            window.removeEventListener("focus", syncCart);
        };
    }, []);

    // 💾 SAVE CART
    const saveCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // ➕ INCREASE QUANTITY
    const increaseQty = (id) => {
        const updated = cart.map((item) =>
            item.id === id
                ? {
                      ...item,
                      quantity: (item.quantity || 0) + 1,
                  }
                : item
        );

        saveCart(updated);
    };

    // ➖ DECREASE QUANTITY
    const decreaseQty = (id) => {
        const updated = cart
            .map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: (item.quantity || 0) - 1,
                      }
                    : item
            )
            .filter((item) => item.quantity > 0);

        saveCart(updated);
    };

    // ❌ REMOVE ITEM
    const removeItem = (id) => {
        const updated = cart.filter((item) => item.id !== id);
        saveCart(updated);
    };

    // 💰 TOTAL PRICE (SAFE)
    const total = cart.reduce((sum, item) => {
        return (
            sum +
            Number(item.product_cost || 0) *
                Number(item.quantity || 0)
        );
    }, 0);

    return (
        <div className="container py-4">

            <h3 className="text-center mb-4">🛒 My Cart</h3>

            {cart.length === 0 ? (
                <div className="text-center py-5">
                    <h4>🛒 Your cart is empty</h4>
                    <p className="text-muted">
                        Add products to see them here
                    </p>
                </div>
            ) : (
                <>
                    <div className="row">

                        {cart.map((item) => (
                            <div key={item.id} className="col-md-6 mb-3">

                                <div className="card shadow-sm p-3">

                                    <div className="d-flex gap-3">

                                        <img
                                            src={
                                                "https://deborahkiboko.alwaysdata.net/static/images/" +
                                                item.product_photo
                                            }
                                            alt={item.product_name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />

                                        <div className="flex-grow-1">

                                            <h5 className="fw-bold">
                                                {item.product_name}
                                            </h5>

                                            <p className="text-muted small">
                                                KES{" "}
                                                {Number(
                                                    item.product_cost
                                                ).toLocaleString()}
                                            </p>

                                            {/* QUANTITY CONTROLS */}
                                            <div className="d-flex align-items-center gap-2">

                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() =>
                                                        decreaseQty(item.id)
                                                    }
                                                >
                                                    ➖
                                                </button>

                                                <span className="fw-bold">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() =>
                                                        increaseQty(item.id)
                                                    }
                                                >
                                                    ➕
                                                </button>

                                            </div>

                                            {/* REMOVE */}
                                            <button
                                                className="btn btn-danger btn-sm mt-2"
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                    {/* TOTAL */}
                    <div className="text-end mt-4 border-top pt-3">

                        <h4>
                            Total: KES{" "}
                            {total.toLocaleString()}
                        </h4>

                        <button className="btn btn-success mt-2 px-4">
                            Proceed to Checkout
                        </button>

                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;