import React from "react";
import { CiBank } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import Navbar from "../../components/Navbar/navbar";

const DashboardHome = () => {
    return (
        <>
            <Navbar />

            <div className="w-full min-h-screen overflow-x-hidden">
                {/* <div className="flex items-center justify-between p-4 px-25 bg-[#FCFAFA]">
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
                    <button className="px-4 py-2 text-white bg-[#509CDB] rounded-[10px] cursor-pointer hover:bg-[#2D88D4]">
                        Log out
                    </button>
                </div>
            </div> */}

                <div className="pt-12 px-25">
                    <p className="font-[600] text-[36px] text-[#4F4F4F]">
                        Welcome to your dashboard, Udemy school
                    </p>
                    <p className="font-[600] text-[#4F4F4F] text-[24px] pt-4 px-18">
                        Uyo/school/@teachable.com
                    </p>

                    <div className="mt-12 space-y-4 px-18">
                        <div className="flex items-center gap-3">
                            <RiAccountPinCircleFill
                                size={35}
                                className="bg-[#EFF3FA] py-[6px] px-[6px] rounded-[6px]"
                            />
                            <p className="text-[#4F4F4F] text-[24px] font-[500]">
                                Add other admins
                            </p>
                        </div>
                        <p className="text-[#4F4F4F]">
                            Create rich course content and coaching products for
                            your students. <br />
                            When you give them a pricing plan, they’ll appear on
                            your site!
                        </p>
                    </div>
                    <div className="mt-12 space-y-4 px-18">
                        <div className="flex items-center gap-3">
                            <CiBank
                                size={35}
                                className="bg-[#EFF3FA] py-[6px] px-[6px] rounded-[6px]"
                            />
                            <p className="text-[#4F4F4F] text-[24px] font-[500]">
                                Add classes
                            </p>
                        </div>
                        <p className="text-[#4F4F4F]">
                            Create rich course content and coaching products for
                            your students. <br />
                            When you give them a pricing plan, they’ll appear on
                            your site!
                        </p>
                    </div>
                    <div className="mt-12 space-y-4 px-18">
                        <div className="flex items-center gap-3">
                            <PiStudent
                                size={35}
                                className="bg-[#EFF3FA] py-[6px] px-[6px] rounded-[6px]"
                            />
                            <p className="text-[#4F4F4F] text-[24px] font-[500]">
                                Add students
                            </p>
                        </div>
                        <p className="text-[#4F4F4F]">
                            Create rich course content and coaching products for
                            your students. <br />
                            When you give them a pricing plan, they’ll appear on
                            your site!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardHome;
