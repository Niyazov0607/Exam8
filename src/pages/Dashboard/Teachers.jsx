"use client";

import { useState, useEffect, useContext } from "react";
import AuthContext from "../../components/context/AuthContextProvider/provider";
import { useNavigate } from "react-router";
import notFounded from "../../assets/notfounded.png";
import Navbar from "../../components/Navbar/navbar";
import { App } from "antd";

const TeachersContent = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTeacher, setNewTeacher] = useState({
        name: "",
        subject: "",
        class: "",
        email: "",
        gender: "",
        age: "",
        about: "",
        avatar: "https://gravatar.com/avatar/default?s=200&d=mp",
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const { message, notification } = App.useApp();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedToken = localStorage.getItem("token") || token;

                if (!storedToken) {
                    setError("Token is not founded, please try again");
                    setLoading(false);
                    notification.error({
                        message: "Authentication Error",
                        description: "Token is not found, please try again",
                        placement: "topRight",
                    });
                    return;
                }

                const res = await fetch(
                    "https://nt-devconnector.onrender.com/api/profile",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Auth-Token": storedToken,
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.msg || "error occurred");
                }

                const localTeachers = JSON.parse(
                    localStorage.getItem("teachers") || "[]"
                );

                const combinedProfiles = [
                    ...(Array.isArray(data) ? data : [data]),
                    ...localTeachers,
                ];
                setProfile(combinedProfiles);
                message.success("Teachers loaded successfully");
            } catch (err) {
                console.error("error:", err);
                setError(err.message || "Something went wrong on Api or Token");
                notification.error({
                    message: "API Error",
                    description:
                        err.message || "Something went wrong on API or Token",
                    placement: "topRight",
                });

                const localTeachers = JSON.parse(
                    localStorage.getItem("teachers") || "[]"
                );
                if (localTeachers.length > 0) {
                    setProfile(localTeachers);
                    message.info("Loaded teachers from local storage");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, message, notification]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeacher((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewTeacher((prev) => ({
                    ...prev,
                    avatar: reader.result,
                }));
            };
            reader.readAsDataURL(file);
            message.success("Image uploaded successfully");
        }
    };

    const validateForm = () => {
        if (!newTeacher.name) {
            notification.warning({
                message: "Validation Error",
                description: "Full Name is required",
                placement: "topRight",
            });
            return false;
        }

        if (!newTeacher.email) {
            notification.warning({
                message: "Validation Error",
                description: "Email address is required",
                placement: "topRight",
            });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newTeacher.email)) {
            notification.warning({
                message: "Validation Error",
                description: "Please enter a valid email address",
                placement: "topRight",
            });
            return false;
        }

        return true;
    };

    const handleAddTeacher = () => {
        if (!validateForm()) {
            return;
        }

        const newTeacherProfile = {
            _id: Date.now().toString(),
            user: {
                _id: Date.now().toString(),
                name: newTeacher.name,
                email: newTeacher.email,
                avatar: newTeacher.avatar,
            },
            status: newTeacher.subject,
            company: newTeacher.class,
            gender: newTeacher.gender,
            age: newTeacher.age,
            bio: newTeacher.about,
        };

        const updatedProfiles = [...profile, newTeacherProfile];
        setProfile(updatedProfiles);

        const localTeachers = JSON.parse(
            localStorage.getItem("teachers") || "[]"
        );
        localStorage.setItem(
            "teachers",
            JSON.stringify([...localTeachers, newTeacherProfile])
        );

        message.success("Teacher added successfully!");
        notification.success({
            message: "Success",
            description: `${newTeacher.name} has been added to the teachers list`,
            placement: "topRight",
        });

        setShowAddForm(false);
        setNewTeacher({
            name: "",
            subject: "",
            class: "",
            email: "",
            gender: "",
            age: "",
            about: "",
            avatar: "https://gravatar.com/avatar/default?s=200&d=mp",
        });
        setSelectedFile(null);
    };

    const filteredProfiles = profile.filter(
        (item) =>
            item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.status &&
                item.status
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
            (item.company &&
                item.company
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
            (item.user.email &&
                item.user.email
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <Navbar />

            <div className="p-4 m-auto bg-white rounded-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[#4F4F4F] text-[36px] font-bold">
                        Teachers
                    </h2>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-4 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        {showAddForm ? "Cancel" : "Add New Teacher"}
                    </button>
                </div>

                {showAddForm && (
                    <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="mb-4 text-lg font-semibold">
                            Add New Teacher
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newTeacher.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Class
                                </label>
                                <select
                                    name="class"
                                    value={newTeacher.class}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Class</option>
                                    <option value="Class 1">Class 1</option>
                                    <option value="Class 2">Class 2</option>
                                    <option value="Class 3">Class 3</option>
                                    <option value="Class 4">Class 4</option>
                                    <option value="Class 5">Class 5</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newTeacher.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={newTeacher.gender}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <select
                                    name="subject"
                                    value={newTeacher.subject}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Subject</option>
                                    <option value="Mathematics">
                                        Mathematics
                                    </option>
                                    <option value="Science">Science</option>
                                    <option value="English">English</option>
                                    <option value="History">History</option>
                                    <option value="Geography">Geography</option>
                                    <option value="Computer Science">
                                        Computer Science
                                    </option>
                                    <option value="Art">Art</option>
                                    <option value="Music">Music</option>
                                    <option value="Physical Education">
                                        Physical Education
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={newTeacher.age}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Age"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    About
                                </label>
                                <textarea
                                    name="about"
                                    value={newTeacher.about}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="About"
                                    rows={4}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Import Img
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {newTeacher.avatar &&
                                    newTeacher.avatar !==
                                        "https://gravatar.com/avatar/default?s=200&d=mp" && (
                                        <div className="mt-2">
                                            <img
                                                src={
                                                    newTeacher.avatar ||
                                                    "/placeholder.svg"
                                                }
                                                alt="Preview"
                                                className="object-cover w-16 h-16 rounded-full"
                                            />
                                        </div>
                                    )}
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={handleAddTeacher}
                                    className="px-4 py-2 text-white transition bg-green-500 rounded-md hover:bg-green-600"
                                >
                                    Save Teacher
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search teachers by name, subject, class or email..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Subject
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Class
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProfiles.length > 0 ? (
                                filteredProfiles.map((item) => (
                                    <tr
                                        key={item._id}
                                        onClick={() => {
                                            navigate(
                                                `/dashboard/profile/${item.user._id}`
                                            );
                                            message.info(
                                                `Viewing ${item.user.name}'s profile`
                                            );
                                        }}
                                        className="transition duration-150 bg-white cursor-pointer hover:bg-gray-100"
                                    >
                                        <td className="flex items-center gap-2 px-6 py-4">
                                            <img
                                                src={
                                                    item.user.avatar ||
                                                    "/placeholder.svg"
                                                }
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            {item.user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.status || "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.company || "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.user.email || "—"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.gender || "—"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-16">
                                        <div className="flex flex-col items-center justify-center">
                                            <img
                                                src={
                                                    notFounded ||
                                                    "/placeholder.svg"
                                                }
                                                alt="No teachers"
                                                className="mb-6 "
                                            />
                                            <p className="font-semibold text-2xl text-[#4F4F4F] mb-2">
                                                No Teachers at this time
                                            </p>
                                            <p className="text-gray-600">
                                                Teachers will appear here after
                                                they enroll in your school.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

const Teachers = () => (
    <App>
        <TeachersContent />
    </App>
);

export default Teachers;
