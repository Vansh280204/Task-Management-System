
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../../services/authService";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            setSuccess("");
    
            try{
                const result = await loginUser(formData);
                setSuccess(result.message);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* Branding Section */}
                <div className="auth-brand">

                    <h1>TaskFlow.</h1>

                    <div className="brand-content">

                        <h2>
                            Welcome back.<br />
                            Let's get things<br />
                            done.
                        </h2>

                        <p>
                            Your workspace is just one step away.
                            Stay connected with your team, manage
                            your projects, and keep your work moving
                            forward with TaskFlow.
                        </p>

                        <div className="brand-features">

                            <div>
                                <span>✓</span>
                                All your projects in one place
                            </div>

                            <div>
                                <span>✓</span>
                                Track tasks and deadlines
                            </div>

                            <div>
                                <span>✓</span>
                                Stay connected with your team
                            </div>

                            <div>
                                <span>✓</span>
                                Keep your productivity on track
                            </div>

                        </div>

                    </div>

                    <p className="brand-footer">
                        Your work, perfectly organized.
                    </p>

                </div>

                {/* Login Form */}
                <div className="auth-form-section">

                    <div className="auth-form-wrapper">

                        <h2>Welcome Back!</h2>

                        <p className="form-subtitle">
                            Enter your credentials to access your account.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Email Address</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">

                                <label>Password</label>

                                <div className="password-wrapper">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                            </div>

                                {error && <p className="error-message">{error}</p>}
                                {success && <p className="success-message">{success}</p>}

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                                >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                        </form>

                        <p className="auth-switch">
                            Don't have an account?
                            <Link to="/register"> Create Account</Link>
                        </p>

                    </div>

                </div>

            </div>

            {/* Copyright Footer */}
            <footer className="auth-footer">
                <p>
                    © 2026 TaskFlow. All rights reserved.
                    <span> | Created by Vansh Patel</span>
                </p>
            </footer>

        </div>
    );
}

export default Login;
