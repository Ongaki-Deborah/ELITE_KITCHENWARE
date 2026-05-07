import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // 📩 Email validation
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    // 🔐 Password strength
    const getPasswordStrength = (pass) => {
        if (pass.length < 4) return "Weak";
        if (pass.length < 8) return "Medium";
        return "Strong";
    };

    const submit = async (e) => {
        e.preventDefault();

        // 📩 Validate email first
        if (!isValidEmail(email)) {
            toast.error("Invalid email format");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append("username", username);
            data.append("email", email);
            data.append("password", password);
            data.append("phone", phone);

            const response = await axios.post(
                "http://deborahkiboko.alwaysdata.net/api/signup",
                data
            );

            toast.success(response.data.success || "Account created!");

            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");

        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-12 card shadow p-4">

                    <h2 className="text-primary text-center">Sign Up</h2>

                    <form onSubmit={submit}>

                        {/* Username */}
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="👤 Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                        {/* Email */}
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="📩 Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Password */}
                        <div className="mb-2 position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="🔑 Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {/* 👁️ Toggle */}
                            <small
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈 Hide" : "👁️ Show"}
                            </small>

                            {/* 🔐 Strength meter */}
                            {password && (
                                <div className="mt-1">
                                    Password strength:{" "}
                                    <b
                                        style={{
                                            color:
                                                getPasswordStrength(password) === "Weak"
                                                    ? "red"
                                                    : getPasswordStrength(password) === "Medium"
                                                    ? "orange"
                                                    : "green",
                                        }}
                                    >
                                        {getPasswordStrength(password)}
                                    </b>
                                </div>
                            )}
                        </div>

                        {/* Phone */}
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="📱 Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                        {/* Button */}
                        <button
                            className="btn btn-info w-100"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm"></span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-3">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>

            {/* 🔔 Toast container */}
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default SignUp;