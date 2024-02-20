import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { BASE_URL, PackageAPI } from "../redux/API";

const PackageCardAdmin = ({
    img,
    price,
    title,
    packageId,
    limitProduct,
    totalProductsCost
}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        // Initialize with existing data
        title: title,
        limitProduct: limitProduct,
        totalProductsCost: totalProductsCost
    });

    const [saveButtonText, setSaveButtonText] = useState("Edit");

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const headers = {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
    };

    const handleEdit = async () => {
        try {
            const response = await axios.put(
                `${PackageAPI.editPackage}/${packageId}`,

                editedData,
                {
                    headers: headers,
                }
            );
            // console.log("edit response , ", response)

            if (response.data.success) {
                toast.success(response.data.msg);

                const updatedPackageResponse = await axios.get(
                    `${PackageAPI.getSinglePackage}/${packageId}`
                );

                // console.log("updatedPackageResponse", updatedPackageResponse);

                if (updatedPackageResponse.data.success) {
                    const updatedPackage = updatedPackageResponse.data.package;
                    // console.log("updatedPackage" , updatedPackage)
                    window.location.reload();
                    setEditedData((prevData) => ({
                        ...prevData,
                        title: updatedPackage.packageName || prevData.title,
                        limitProduct: updatedPackage.limitProduct || prevData.limitProduct,
                        totalProductsCost: updatedPackage.totalProductsCost || prevData.totalProductsCost,
                    }));
                }
                setIsEditing(false);
                setSaveButtonText("Edit");

                // dispatch(getAllProductThunk());
            } else {
                // Notify failure
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error("Error editing product:", error);
            // Handle error, notify user, etc.
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `${PackageAPI.deletePackage}/${packageId}`,
                { headers: headers }
            );

            if (response.data.success) {
                toast.success(response.data.msg);
                setIsEditing(false);
                window.location.reload();
                // dispatch(getAllProductThunk());
            } else {
                // Notify failure
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error("Error deleting package:", error);
            // Handle error, notify user, etc.
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("value changes", name, value)
    };

    return (
        <div className="product-card-link">
            <div className="rounded-lg overflow-hidden bg-gray-100 product-card">
                <img src={img[0]} alt="Bikes" className="object-cover h-64 w-full" />
                <div className="p-4">
                    <h1 className="text-lg font-bold p-1">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={editedData.title}
                                onChange={handleInputChange}
                            />
                        ) : (
                            title
                        )}
                    </h1>

                    <div className="font-bold p-1">
                        <p>Price : </p>
                        <div className="ml-4 text-sm">
                            <div className="flex gap-2 items-center">
                                <p>For 6 Month : </p>
                                <p>Rs {price[0]}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p>For 12 Month</p>
                                <p>Rs {price[1]}</p>
                            </div>
                        </div>
                    </div>

                    <p className="font-md p-1">
                        <span>Limit Of Products : </span>
                        {isEditing ? (
                            <input
                                type="text"
                                name="limitProduct"
                                value={editedData.limitProduct}
                                onChange={handleInputChange}
                            />
                        ) : (
                            limitProduct
                        )}
                    </p>

                    <p className="font-md p-1">
                        <span>Total Cost of Products : </span>
                        {isEditing ? (
                            <input
                                type="text"
                                name="totalProductsCost"
                                value={editedData.totalProductsCost}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <p className="inline text-green-600 font-bold">{totalProductsCost}</p>
                        )}
                    </p>

                    <div className="flex">
                        {isEditing ? (
                            <button
                                onClick={handleEdit}
                                className="bg-primary p-3 rounded-lg hover:bg-gray-500 hover:text-white hover:no-underline text-white text-center m-4"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-primary p-3 rounded-lg hover:bg-gray-500 hover:text-white hover:no-underline text-white text-center m-4"
                            >
                                Edit
                            </button>
                        )}
                        <button
                            className="bg-gray-500 p-3 rounded-lg hover:bg-primary hover:text-white hover:no-underline text-white text-center m-4"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PackageCardAdmin;
