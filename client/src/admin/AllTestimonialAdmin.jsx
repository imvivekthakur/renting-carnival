import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import DefaultNavbar from "../component/Default_Navbar";
import Footer from "../component/Footer";
import { CouponAPI, TestimonialAPI } from "../redux/API";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllTestimonialThunk } from "../redux/testimonialSlice";

const AllTestimonialAdmin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allTestimonials, setAllTestimonials] = useState([]);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        dispatch(getAllTestimonialThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllTestimonials(res.payload.data.allTestimonials);
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

    const handleDelete = async (testimonialId) => {
        console.log("entered delete")
        try {
            const response = await axios.post(
                `${TestimonialAPI.deleteTestimonial}/${testimonialId}`,
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

    return (
        <>
            <DefaultNavbar />
            <div className="parent-container my-40">
                <h2 className="w-full text-center py-4 text-2xl font-bold mt-4">All Testimonial Code</h2>
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
                        {allTestimonials.map((card, index) => (
                            <div className="product-card-link">
                                <div className="rounded-lg overflow-hidden bg-gray-100 product-card">
                                    <img src={card.testimonialImages[0]} alt="CoupenCode" className="object-cover h-64 w-full" />
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            Name : <span className="text-green-600 text-lg">{card.name}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4">
                                        <h1 className="text-sm font-bold p-1">
                                            Description : <span className="text-green-600 text-lg">{card?.desc}</span>
                                        </h1>
                                    </div>
                                    <div className="px-4 pt-2">
                                        <h1 className="text-sm font-bold p-1">
                                            Title : <span className="text-green-600 text-lg">{card?.title}</span>
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

export default AllTestimonialAdmin;
