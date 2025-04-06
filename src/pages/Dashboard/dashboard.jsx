"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import logoExam from "../../assets/logoExam.png";
import {
    RiHome5Line,
    RiUserLine,
    RiUserStarLine,
    RiMoneyDollarCircleLine,
    RiSettings4Line,
    RiFileList3Line,
    RiApps2Line,
} from "react-icons/ri";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveButton = () => {
        const path = location.pathname;
        if (path.includes("/dashboard/teachers")) return "Teachers";
        if (path.includes("/dashboard/students")) return "Students";
        if (path.includes("/dashboard/billing")) return "Billing";
        if (path.includes("/dashboard/settings")) return "Settings and profile";
        if (path.includes("/dashboard/exams")) return "Exams";
        if (path.includes("/dashboard/features")) return "Features";
        return "Dashboard";
    };

    const [activeButton, setActiveButton] = useState(getActiveButton());

    useEffect(() => {
        setActiveButton(getActiveButton());
    }, [location.pathname]);

    const menuItems = [
        {
            name: "Dashboard",
            icon: <RiHome5Line size={18} />,
            path: "/dashboard",
        },
        {
            name: "Teachers",
            icon: <RiUserStarLine size={18} />,
            path: "/dashboard/teachers",
        },
        {
            name: "Students",
            icon: <RiUserLine size={18} />,
            path: "/dashboard/students",
        },
        {
            name: "Billing",
            icon: <RiMoneyDollarCircleLine size={18} />,
            path: "/dashboard/billing",
        },
        {
            name: "Settings and profile",
            icon: <RiSettings4Line size={18} />,
            path: "/dashboard/settings",
        },
        {
            name: "Exams",
            icon: <RiFileList3Line size={18} />,
            path: "/dashboard/exams",
        },
        {
            name: "Features",
            icon: <RiApps2Line size={18} />,
            path: "/dashboard/features",
        },
    ];

    const handleButtonClick = (buttonName, path) => {
        setActiveButton(buttonName);
        navigate(path);
    };

    return (
        <div className="flex items-start justify-between min-h-screen m-auto">
            <div className="bg-[#152259] w-[241px] text-center h-screen fixed left-0 top-0 overflow-y-auto">
                <div className="pb-[10px] pt-4">
                    <div className="m-auto">
                        <img
                            className="w-24 h-auto m-auto"
                            src={logoExam || "/placeholder.svg"}
                            alt="logo"
                        />
                    </div>
                    <p className="mt-2 text-sm text-white">
                        Udemy Inter. school
                    </p>
                </div>
                <div className="border-t border-white opacity-20" />
                <div className="pt-[10px] text-white m-auto justify-center text-center py-3 space-y-3">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            onClick={() =>
                                handleButtonClick(item.name, item.path)
                            }
                            className={`flex w-[192px] gap-3 cursor-pointer items-center justify-start rounded-[4px] m-auto text-left py-[11px] px-[16px] transition-all duration-200 ${
                                activeButton === item.name
                                    ? "bg-[#2D88D4] text-white font-medium shadow-md"
                                    : " text-white hover:bg-[#3e8ac85f]"
                            }`}
                        >
                            {item.icon}
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 p-6 ml-[241px]">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
