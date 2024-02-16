import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import DefaultNavbar from "../component/Default_Navbar";
import Footer from "../component/Footer";
import { getAllCoupenThunk } from "../redux/coupenSlice";
import { CouponAPI } from "../redux/API";
import axios from "axios";
import { toast } from "react-toastify";
const AllCoupenAdmin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allCoupens, setAllCoupens] = useState([]);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        dispatch(getAllCoupenThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllCoupens(res.payload.data.allCoupens);
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

    const handleDelete = async (coupenId) => {
        console.log("entered delete")
        try {
            const response = await axios.post(
                `${CouponAPI.deleteCoupen}/${coupenId}`,
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
                <h2 className="w-full text-center py-4 text-2xl font-bold mt-4">All Coupon Code</h2>
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
                        {allCoupens.map((card, index) => (
                            <div className="product-card-link">
                                <div className="rounded-lg overflow-hidden bg-gray-100 product-card">
                                    <img src={card.coupenImages[0]} alt="CoupenCode" className="object-cover h-64 w-full" />
                                    <div className="p-4">
                                        <h1 className="text-sm font-bold p-1">
                                            Coupon Code : <span className="text-green-600 text-lg">{card.coupenCode}</span>
                                        </h1>
                                    </div>
                                    <div className="p-4">
                                        <h1 className="text-sm font-bold p-1">
                                            Discount : <span className="text-green-600 text-lg">{card?.discount}%</span>
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

export default AllCoupenAdmin;
