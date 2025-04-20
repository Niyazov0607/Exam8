import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { ImCheckmark } from "react-icons/im";
import { FaGlobe } from "react-icons/fa";
import Navbar from "../../../components/Navbar/navbar";

const api = import.meta.env.VITE_API;
const fetchPosts = async ({ queryKey }) => {
    const [_key, category] = queryKey;

    const { data } = await axios.get(`
  ${api}/flower/category/${category}?type=&access_token=64bebc1e2c6d3f056a8c85b7
`);
    return data;
};

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [searchParams] = useSearchParams();
    const [category, setCategory] = useState(searchParams.get("category"));
    const { data, isLoading, error } = useQuery({
        queryKey: ["posts", category],
        queryFn: fetchPosts,
    });

    if (isLoading)
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-[#17a2b8] border-t-transparent rounded-full animate-spin"></div>
                <h1 className="mt-4 text-lg font-semibold text-gray-600">
                    Loading....
                </h1>
            </div>
        );

    if (error) return <p className="text-red-500">{error.message}</p>;
    if (!profile) return <p className="text-red-500">Profile not found</p>;
    if (!profile) return <p className="text-red-500">Profile not found</p>;

    return (
        <>
            <Navbar />

            <div className="max-w-5xl p-6 mx-auto mt-4">
                <button
                    onClick={() => navigate("/dashboard/teachers")}
                    className="px-4 py-2 text-[16px] bg-gray-100 rounded cursor-pointer hover:bg-gray-200 mb-6"
                >
                    Back To Profiles
                </button>

                <div className="flex flex-col p-6 bg-white rounded-lg md:flex-row">
                    <div className="flex flex-col items-center pr-6 border-gray-200 md:w-1/3">
                        <img
                            className="w-[160px] h-[160px] object-cover rounded-full border-[5px] border-white"
                            src={profile.user.avatar}
                            alt={profile.user.name}
                        />
                        <h2 className="mt-4 text-xl font-semibold text-gray-800">
                            {profile.user.name || "No Name"}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {profile.user.email || "tim.jennings@example.com"}
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                            <button className="p-3 transition bg-gray-100 rounded-lg hover:bg-gray-200">
                                📞
                            </button>
                            <button className="p-3 transition bg-gray-100 rounded-lg hover:bg-gray-200">
                                💬
                            </button>
                            <button className="p-3 transition bg-gray-100 rounded-lg hover:bg-gray-200">
                                ✉️
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 md:w-2/3 md:mt-0 md:pl-8">
                        <h3 className="mb-2 text-lg font-semibold text-gray-800">
                            About
                        </h3>
                        <p className="mb-6 text-gray-600">
                            {profile.bio ||
                                "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum."}
                        </p>

                        <div className="grid grid-cols-2 text-sm text-gray-700 gap-y-4">
                            <div>
                                <span className="font-medium">Subject</span>
                                <p>{profile.subject || "English"}</p>
                            </div>
                            <div>
                                <span className="font-medium">Class</span>
                                <p>{profile.class || "J SS 1"}</p>
                            </div>
                            <div>
                                <span className="font-medium">Age</span>
                                <p>{profile.age || "34"}</p>
                            </div>
                            <div>
                                <span className="font-medium">Gender</span>
                                <p>{profile.gender || "Male"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
