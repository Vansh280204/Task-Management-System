
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { registerUser } from "../../services/authService";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
            const result = await registerUser(formData);
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
                            Work smarter.<br />
                            Stay organized.<br />
                            Achieve more.
                        </h2>

                        <p>
                            TaskFlow brings your projects, tasks, and team
                            collaboration together in one place.
                            Plan your work, track progress, and achieve
                            your goals without losing focus.
                        </p>

                        <div className="brand-features">

                            <div>
                                <span>✓</span>
                                Manage projects and tasks
                            </div>

                            <div>
                                <span>✓</span>
                                Track work with Kanban boards
                            </div>

                            <div>
                                <span>✓</span>
                                Collaborate with your team
                            </div>

                            <div>
                                <span>✓</span>
                                Monitor progress and activities
                            </div>

                            <div>
                                <span>✓</span>
                                Get reminders and notifications
                            </div>

                        </div>

                    </div>

                    <p className="brand-footer">
                        Your work, perfectly organized.
                    </p>

                </div>

                {/* Registration Form */}
                <div className="auth-form-section">

                    <div className="auth-form-wrapper">

                        <h2>Create an account</h2>

                        <p className="form-subtitle">
                            Get started with TaskFlow today.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

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
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your address"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                />
                            </div>
                                {error && <p className="error-message">{error}</p>}
                                {success && <p className="success-message">{success}</p>}
                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                                >
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>

                        </form>

                        <p className="auth-switch">
                            Already have an account?
                            <Link to="/login"> Login</Link>
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

export default Register;
