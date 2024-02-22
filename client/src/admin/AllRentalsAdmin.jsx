import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import DefaultNavbar from "../component/Default_Navbar";
import Footer from "../component/Footer";
import { CouponAPI, RentalAPI, TestimonialAPI } from "../redux/API";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllRentalThunk } from "../redux/rentalSubscriptionSlice";

const AllRentalsAdmin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allRentalsData, setAllRentalsData] = useState([]);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        dispatch(getAllRentalThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllRentalsData(res?.payload?.data?.allRentals);
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

    const handleDelete = async (rentalId) => {
        console.log("entered delete")
        try {
            const response = await axios.delete(
                `${RentalAPI.deleteRental}/${rentalId}`,
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
            console.error("Error deleting product:", error);
            // Handle error, notify user, etc.
        }
    };

    function formatingTime(dateString) {
        let date = new Date(dateString);
        console.log("date", dateString)
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        // Adjust hours for 12-hour format
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        let timeString = hours + ":" + minutes + ":" + seconds + " " + ampm;
        return timeString;
    }

    return (
        <>
            <DefaultNavbar />
            <div className="parent-container my-40">
                <h2 className="w-full text-center py-4 text-2xl font-bold mt-4">All Rentals</h2>
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
                        {allRentalsData?.map((card, index) => (
                            <div className="product-card-link">
                                <div className="rounded-lg overflow-hidden bg-gray-100 product-card">
                                    {/* <img src={card.testimonialImages[0]} alt="CoupenCode" className="object-cover h-64 w-full" /> */}
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            Name : <span className="text-green-600 text-lg">{card?.owner?.name}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            PickUp Location : <span className="text-green-600 text-lg">{card?.pickUpLocation}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4">
                                        <h1 className="text-sm font-bold p-1">
                                            DropOff Location : <span className="text-green-600 text-lg">{card?.dropOffLocation}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            PickUp Date : <span className="text-green-600 text-lg">{card?.pickUpDate.split('T')[0]}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            DropOff Date : <span className="text-green-600 text-lg">{card?.dropOffDate.split('T')[0]}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            PickUp Time : <span className="text-green-600 text-lg">{formatingTime(card?.pickUpTime)}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            DropOff Time : <span className="text-green-600 text-lg">{formatingTime(card?.dropOffTime)}</span>
                                        </h1>
                                    </div>
                                    <div className="flex">
                                        <button
                                            className="bg-gray-500 p-3 rounded-lg hover:bg-primary hover:text-white hover:no-underline text-white text-center m-4"
                                            onClick={() => handleDelete(card._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AllRentalsAdmin;
