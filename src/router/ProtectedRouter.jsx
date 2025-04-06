"use client";

import { useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../components/context/AuthContextProvider/provider";

const ProtectedRouter = ({ children }) => {
    const { token } = useContext(AuthContext) || {};
    const finalToken = token || localStorage.getItem("token");

    return finalToken ? children : <Navigate to="/register" replace />;
};

export default ProtectedRouter;
