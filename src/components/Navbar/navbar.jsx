import React from "react";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div>
            <div className="flex items-center justify-between p-4 px-25 bg-[#FCFAFA] m-auto11 mt-[20px]">
                <p className="text-[#424242] font-[500] max-w-[600px]">
                    Learn how to launch faster <br />
                    watch our webinar for tips from our experts and get a
                    limited time offer.
                </p>
                <div className="flex items-center space-x-10">
                    <IoNotifications
                        color="gray"
                        className="cursor-pointer"
                        size={20}
                    />
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white bg-[#509CDB] rounded-[10px] cursor-pointer hover:bg-[#2D88D4]"
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
