"use client";

import { createContext, useEffect, useState } from "react";
import { apiClient } from "../../../config/apiConfig";
import { login as loginService } from "../../../service/authService";

const AuthContext = createContext({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {},
    loginStatus: false,
    setLoginStatus: () => {},
    handleLogin: () => {},
});

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken !== "null" ? storedToken : null;
    });

    const [loginStatus, setLoginStatus] = useState(() => {
        return localStorage.getItem("login") === "true";
    });

    useEffect(() => {
        if (token) {
            apiClient.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
        } else {
            delete apiClient.defaults.headers.common["Authorization"];
        }

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }

        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }

        if (loginStatus) {
            localStorage.setItem("login", loginStatus.toString());
        } else {
            localStorage.removeItem("login");
        }
    }, [user, token, loginStatus]);

    const handleLogin = async (email, password) => {
        try {
            const response = await loginService({ email, password });
            console.log("Login response:", response);

            if (!response || !response.token) {
                throw new Error("Invalid login response format");
            }

            const userData = response.user || {};

            setUser(userData);
            setToken(response.token);
            setLoginStatus(true);

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", response.token);
            localStorage.setItem("login", "true");

            return { success: true, userData };
        } catch (error) {
            console.error(
                "Login error:",
                error.response?.data || error.message
            );
            setLoginStatus(false);
            return { success: false, error };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                loginStatus,
                setLoginStatus,
                handleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
