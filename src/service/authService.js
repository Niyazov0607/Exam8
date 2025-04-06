import axios from "axios";

const BASE_URL = "https://nt-devconnector.onrender.com/api";

const API = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Object} user data from the server
 */
export const register = async (userData) => {
    try {
        console.log("Registration data:", userData);

        const { data } = await API.post("/users", userData);

        console.log("Registration successful:", data);

        if (data?.token) {
            localStorage.setItem("token", data.token);
        }

        return data;
    } catch (error) {
        return handleApiError(error, "Registration error!");
    }
};

/**
 * Login an existing user
 * @param {Object} formData
 * @returns {Object}
 */
export const login = async (formData) => {
    try {
        console.log("Login request:", formData);

        const { data } = await API.post("/auth", formData);

        if (!data?.token) throw new Error("Login error: No token returned.");

        console.log("Server response:", data);

        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        return handleApiError(error, "Login error!");
    }
};

/**
 * Logout the user
 */
export const logout = () => {
    console.log("User logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

/**
 * Handle API errors
 * @param {Object} error - The error object from Axios
 * @param {string} defaultMessage - Default error message
 */
const handleApiError = (error, defaultMessage) => {
    console.error("Error:", error.response?.data || error.message);

    if (error.response) {
        console.error("Status code:", error.response.status);
        console.error("Error details:", error.response.data);
    }

    throw error.response?.data || { message: defaultMessage };
};
