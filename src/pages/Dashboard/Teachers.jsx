import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const FlowerList = () => {
    const [flowers, setFlowers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                "https://green-shop-backend.onrender.com/api/flower/category/small-plants?access_token=64bebc1e2c6d3f056a8c85b7&sort=default-sorting&type=all-plants&range_min=0&range_max=1000"
            )
            .then((res) => {
                // 👉 Inspect exactly what fields you have:
                console.log("First flower item:", res.data?.data?.[0]);

                setFlowers(res.data?.data || []);
            })
            .catch((err) => {
                console.error("Failed to fetch flowers:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Combine name/title into one string for filtering
    const filteredFlowers = flowers.filter((flower) => {
        const rawName = flower.name || flower.title || "";
        return rawName.toLowerCase().includes(search.toLowerCase());
    });

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            width: 64,
            render: (src) => (
                <img
                    src={src}
                    alt="flower"
                    style={{
                        width: 48,
                        height: 48,
                        objectFit: "cover",
                        borderRadius: 4,
                    }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            // No more “Unknown”—we’ve guaranteed `name` is always at least `""` here:
            render: (text) => text || "-",
        },
        {
            title: "Category",
            dataIndex: "category",
            render: (text) => text || "-",
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (p) => (typeof p === "number" ? `$${p.toFixed(2)}` : "-"),
        },
    ];

    const dataSource = filteredFlowers.map((flower) => ({
        key: flower._id,
        // pick the real field:
        name: flower.name || flower.title || "",
        image:
            flower.main_image ||
            flower.images?.[0] ||
            "https://via.placeholder.com/48",
        category: flower.category,
        price: flower.price,
    }));

    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <SearchOutlined className="text-gray-400" />
                <Input
                    placeholder="Search flowers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-sm"
                />
            </div>

            <div className="overflow-x-auto shadow rounded-xl">
                <Table
                    columns={columns}
                    dataSource={loading ? [] : dataSource}
                    loading={loading}
                    rowKey="key"
                    pagination={false}
                    locale={{ emptyText: "No flowers found." }}
                    scroll={{ x: true }}
                />
            </div>
        </div>
    );
};

export default FlowerList;
