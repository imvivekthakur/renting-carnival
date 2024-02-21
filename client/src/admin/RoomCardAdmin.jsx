import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ProductAPI, RoomAPI } from "../redux/API";

const RoomCardAdmin = ({
    img,
    heading,
    roomId
}) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        // Initialize with existing data
        heading: heading,
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
                `${RoomAPI.editRoom}/${roomId}`,

                editedData,
                {
                    headers: headers,
                }
            );
            // console.log("edit response , ", response)

            if (response.data.success) {
                toast.success(response.data.msg);

                const updatedRoomResponse = await axios.get(
                    `${RoomAPI.getSingleRoom}/${roomId}`
                );

                if (updatedRoomResponse.data.success) {
                    const updatedRoom = updatedRoomResponse.data.product;
                    window.location.reload();
                    setEditedData((prevData) => ({
                        ...prevData,
                        heading: updatedRoom.heading || prevData.heading,
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
            const response = await axios.post(
                `${RoomAPI.deleteRoom}/${roomId}`,
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
            console.error("Error deleting Room:", error);
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
                                name="heading"
                                value={editedData.heading}
                                onChange={handleInputChange}
                            />
                        ) : (
                            heading
                        )}
                    </h1>

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

export default RoomCardAdmin;
