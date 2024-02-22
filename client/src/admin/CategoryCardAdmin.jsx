import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { CategoryAPI, ProductAPI } from "../redux/API";

const CategoryCardAdmin = ({
    img,
    name,
    featured,
    categoryId
}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        // Initialize with existing data
        name: name,
        featured: featured,
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
                `${CategoryAPI.editCategory}/${categoryId}`,

                editedData,
                {
                    headers: headers,
                }
            );
            // console.log("edit response , ", response)

            if (response.data.success) {
                toast.success(response.data.msg);

                const updatedProductResponse = await axios.get(
                    `${CategoryAPI.getSingleCategory}/${categoryId}`
                );

                // console.log("updatedProductResponse", updatedProductResponse);

                if (updatedProductResponse.data.success) {
                    const updatedProduct = updatedProductResponse.data.category;
                    window.location.reload();
                    setEditedData((prevData) => ({
                        ...prevData,
                        name: updatedProduct.name || prevData.name,
                        featured: updatedProduct.featured || prevData.featured,
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
            console.error("Error editing category:", error);
            // Handle error, notify user, etc.
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(
                `${CategoryAPI.deleteCategory}/${categoryId}`,
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
            console.error("Error deleting category:", error);
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
        <div className="category-card-link">
            <div className="rounded-lg overflow-hidden bg-gray-100 category-card">
                <NavLink to={`/category/${categoryId}`}>
                    <img src={img[0]} alt="Bikes" className="object-cover h-64 w-full" />
                </NavLink>
                <div className="p-4">
                    <h1 className="text-lg font-bold p-1">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={editedData.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            name
                        )}
                    </h1>

                    <p className="font-md p-1">
                        <span>Featured : </span>
                        {isEditing ? (
                            <select value={editedData.featured} name="featured" onChange={handleInputChange}>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        ) : (
                            featured
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

export default CategoryCardAdmin;
