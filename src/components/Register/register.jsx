import { Input, Spin } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const api = import.meta.env.VITE_API_DEVCONNECTOR;

function Register() {
    const [teacher, setTeacher] = useState({
        email: "",
        password: "",
        login: "",
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        login: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const setTeacherValue = (name, value) => {
        setTeacher({ ...teacher, [name]: value });
    };

    const registerFc = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${api}/user/sign-up?access_token=67dbc36eaf06d13e0cde0c21`,
                {
                    email: teacher.email,
                    password: teacher.password,
                    name: teacher.login,
                    surname: teacher.login,
                }
            );
            console.log(response?.data);
            localStorage.setItem("token", response?.data?.data?.token);
            localStorage.setItem("userId", response?.data?.data?.user?._id);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setErrorMessage(
                error.response?.data?.message ||
                    "An error occurred, please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {
            email: teacher.email.trim() === "",
            password: teacher.password.trim() === "",
            login: teacher.login.trim() === "",
        };
        setErrors(newErrors);
        if (Object.values(newErrors).includes(true)) return;
        registerFc();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen gap-16">
            <h2 className="text-center text-4xl font-semibold text-[#4F4F4F] ">
                Welcome, Sign Up
            </h2>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-16 border rounded shadow-md"
            >
                <p className="m-auto text-center font-medium max-w-[230px] text-[#667085] text-base">
                    It is our great pleasure to have you on board!
                </p>

                <label className="w-[100%] block relative my-3">
                    <Input
                        type="text"
                        className={`w-full h-10 my-5 ${
                            errors.email ? "border-red-500" : ""
                        }`}
                        name="email"
                        onChange={(e) =>
                            setTeacherValue(e.target.name, e.target.value)
                        }
                        placeholder="Email"
                        disabled={isLoading}
                    />
                    <span
                        className={`text-red-500 text-sm absolute left-0 transition-all duration-300 ${
                            errors.email
                                ? "opacity-100 translate-y-[60px]"
                                : "opacity-0 translate-y-7 pointer-events-none"
                        }`}
                    >
                        Please enter your email
                    </span>
                </label>
                <label className="w-[100%] block relative my-3">
                    <Input
                        type="text"
                        className={`w-full h-10 mb-5 ${
                            errors.login ? "border-red-500" : ""
                        }`}
                        name="login"
                        onChange={(e) =>
                            setTeacherValue(e.target.name, e.target.value)
                        }
                        placeholder="Login"
                        disabled={isLoading}
                    />
                    <span
                        className={`text-red-500 text-sm absolute left-0 transition-all duration-300 ${
                            errors.login
                                ? "opacity-100 translate-y-10"
                                : "opacity-0 translate-y-7 pointer-events-none"
                        }`}
                    >
                        Please enter your login
                    </span>
                </label>
                <label className="w-[100%] block relative my-3">
                    <Input
                        type="password"
                        className={`w-full h-10 mb-5 ${
                            errors.password ? "border-red-500" : ""
                        }`}
                        name="password"
                        onChange={(e) =>
                            setTeacherValue(e.target.name, e.target.value)
                        }
                        placeholder="Password"
                        disabled={isLoading}
                    />
                    <span
                        className={`text-red-500 text-sm absolute left-0 transition-all duration-300 ${
                            errors.password
                                ? "opacity-100 translate-y-10"
                                : "opacity-0 translate-y-7 pointer-events-none"
                        }`}
                    >
                        Please enter your password
                    </span>
                </label>
                {errorMessage && (
                    <div className="mb-4 text-center text-red-500">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className={`block w-full p-2 bg-[#509CDB] font-medium text-white rounded ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spin size="small" className="mr-2" />
                    ) : (
                        "Sign Up"
                    )}
                </button>

                <Link
                    to={"/login"}
                    className={`font-semibold text-[#509CDB] mt-4 text-center w-full m-auto block ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {isLoading
                        ? "Loading..."
                        : "Already have an account? Sign In"}
                </Link>
            </form>
        </div>
    );
}

export default Register;
