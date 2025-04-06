"use client";

import { useState, useContext, useEffect } from "react";
import {
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaExclamationCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { register } from "../../service/authService";
import AuthContext from "../context/AuthContextProvider/provider";

const Register = () => {
    const navigate = useNavigate();
    const { setUser, setToken, setLoginStatus } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { name, email, password, password2 } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotification = (type, message) => {
        setNotification({ type, message });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setError("Passwords do not match!");
            showNotification("error", "Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const res = await register({ name, email, password });
            console.log("User Registered:", res);

            if (res && res.token) {
                setToken(res.token);
                setLoginStatus(true);

                if (res.user) {
                    setUser(res.user);
                }

                showNotification(
                    "success",
                    "Registration successful! Redirecting to dashboard..."
                );

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } else {
                setError(
                    "Registration successful but couldn't log in automatically. Please try logging in."
                );
                showNotification(
                    "error",
                    "Registration completed but login failed. Please try logging in."
                );
            }
        } catch (err) {
            setError(err.message || "Something went wrong!");
            showNotification("error", "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-gray-50 to-gray-100 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg">
                {notification && (
                    <div
                        className={`fixed top-4 right-4 p-4 rounded-md shadow-lg flex items-center ${
                            notification.type === "success"
                                ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                                : "bg-red-50 text-red-800 border-l-4 border-red-500"
                        } transition-all duration-300 ease-in-out z-50`}
                    >
                        {notification.type === "success" ? (
                            <FaCheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        ) : (
                            <FaExclamationCircle className="w-5 h-5 mr-2 text-red-500" />
                        )}
                        <p>{notification.message}</p>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="p-6 bg-white rounded-lg shadow-xl">
                            <div className="flex items-center justify-center mb-4 text-green-500">
                                <FaCheckCircle className="w-12 h-12" />
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-center">
                                Registration Successful!
                            </h3>
                            <p className="mb-6 text-center text-gray-600">
                                Your account has been created successfully.
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-white bg-[#2D88D4] rounded-md hover:bg-[#2678BD]"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="">
                    <div className="">
                        <h1 className="text-3xl font-bold text-center text-[#4F4F4F]">
                            Welcome, Sign up
                        </h1>
                    </div>

                    <div className="p-8 overflow-hidden bg-white border border-gray-200 shadow-sm w-[512px] h-[500px] mt-[50px]">
                        <p className="mb-6 text-center text-gray-600">
                            It is our great pleasure to have <br /> you on
                            board!
                        </p>

                        {error && (
                            <div className="p-4 mb-6 text-red-600 border-l-4 border-red-500 rounded-md bg-red-50">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-red-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3 ">
                            <div>
                                <div className="relative rounded-md">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your Email"
                                        name="email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                        className="block m-auto pl-[13px] pr-[51px] py-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17a2b8] focus:border-[#17a2b8] transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="relative rounded-md">
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Create your Login"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        required
                                        className="block m-auto pl-[13px] pr-[51px] py-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17a2b8] focus:border-[#17a2b8] transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="relative rounded-md">
                                    <input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Create your Password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        required
                                        className="block m-auto pl-[13px] pr-[51px] py-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17a2b8] focus:border-[#17a2b8] transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-[100px] flex items-center pr-3 text-gray-500 transition-colors hover:text-gray-700 focus:outline-none"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="w-5 h-5" />
                                        ) : (
                                            <FaEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="relative rounded-md">
                                    <input
                                        id="password2"
                                        placeholder="Confirm the password"
                                        name="password2"
                                        value={password2}
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        onChange={handleChange}
                                        required
                                        className="block pl-[13px] pr-[51px] m-auto py-[13px]  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#17a2b8] focus:border-[#17a2b8] transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                        className="absolute inset-y-0 right-[20px] flex items-center pr-3 text-gray-500 transition-colors hover:text-gray-700 focus:outline-none"
                                    ></button>
                                </div>
                            </div>

                            <div className="pt-2 ">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex justify-center cursor-pointer py-[12px] px-[92px] m-auto border border-transparent rounded-md text-white bg-[#2D88D4] hover:bg-[#2678BD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D88D4] transition-all disabled:opacity-70 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg
                                                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin "
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Registering...
                                        </span>
                                    ) : (
                                        "Sign up"
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="pt-3 mt-6 text-sm text-center text-gray-600 border-t border-gray-200">
                            <p>
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-[#2D88D4] font-medium hover:underline transition-colors"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
