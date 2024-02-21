import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { getAllCoupenThunk } from "../redux/coupenSlice";
import { CouponAPI, RoomAPI } from "../redux/API";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { getAllRoomThunk } from "../redux/roomSlice";
import DefaultNavbar from "./Default_Navbar";
import Footer from "./Footer";

const AllRooms = () => {
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
                                            <img src={card?.roomImages[0]} alt="Room" className="object-cover h-64 w-full" />
                                            <div className="p-4">
                                                <h1 className="text-lg font-bold p-1">
                                                    {card?.heading}
                                                </h1>
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

export default AllRooms;
