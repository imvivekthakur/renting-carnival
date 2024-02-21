import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import DefaultNavbar from "../component/Default_Navbar";
import Footer from "../component/Footer";
import { getAllCoupenThunk } from "../redux/coupenSlice";
import { CouponAPI, RoomAPI } from "../redux/API";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllRoomThunk } from "../redux/roomSlice";
import RoomCardAdmin from "./RoomCardAdmin";

const AllRoomAdmin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allRooms, setAllRooms] = useState([]);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        dispatch(getAllRoomThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllRooms(res.payload.data.allRooms);
                    setLoading(false);
                }
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const headers = {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
    };

    const handleDelete = async (roomId) => {
        console.log("entered delete")
        try {
            const response = await axios.post(
                `${RoomAPI.deleteRoom}/${roomId}`,
                { headers: headers }
            );

            console.log("response ", response)

            if (response.data.success) {
                toast.success(response.data.msg);
                window.location.reload();
                // dispatch(getAllProductThunk());
            } else {
                // Notify failure
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error("Error deleting room:", error);
            // Handle error, notify user, etc.
        }
    };

    return (
        <>
            <DefaultNavbar />
            <div className="parent-container my-40">
                <h2 className="w-full text-center py-4 text-2xl font-bold mt-4">All Room</h2>
                {loading ? (
                    <div className="loader-container w-[100%] mx-auto flex items-center justify-center">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{
                                display: "flex",
                                alignItems: "center",
                            }}
                            wrapperClass="color-ring-wrapper"
                            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-[90%] mx-auto mt-5 pt-5 mb-5 ">
                        {
                            allRooms.length > 0 ? allRooms.map((card, index) => {
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
                                )
                            }) : <h2 className="text-2xl flex w-full justify-center items-center">No Room Found</h2>
                        }
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AllRoomAdmin;
