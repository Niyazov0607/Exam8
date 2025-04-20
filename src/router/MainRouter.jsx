import { Route, Routes, Navigate } from "react-router";
import Login from "../components/Login/login";
import Register from "../components/Register/register";
import Dashboard from "../pages/Dashboard/dashboard";
import Teachers from "../pages/Dashboard/Teachers";
import Students from "../pages/Dashboard/students";
import Billing from "../pages/Dashboard/billing";
import Settings from "../pages/Dashboard/setting";
import Exams from "../pages/Dashboard/exams";
import Features from "../pages/Dashboard/features";
import DashboardHome from "../pages/Dashboard/dashboardHome";
import Profile from "../pages/Dashboard/ProfileInfo/profile";
import Navbar from "../components/Navbar/navbar";

const MainRouter = () => {
    const isAuthenticated = localStorage.getItem("token") !== null;

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <Navigate to="/register" replace />
                    )
                }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="teachers" element={<Teachers />} />
                <Route path="students" element={<Students />} />
                <Route path="settings" element={<Settings />} />
                <Route path="exams" element={<Exams />} />
                <Route path="features" element={<Features />} />
                <Route path="billing" element={<Billing />} />
                <Route path="profile/:id" element={<Profile />} />{" "}
            </Route>

            <Route path="/navbar" element={<Navbar />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default MainRouter;
