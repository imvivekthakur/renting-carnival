import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import DefaultNavbar from "../component/Default_Navbar";
import Footer from "../component/Footer";
import { getAllCategoryThunk } from "../redux/categorySlice";
import { CategoryAPI, CouponAPI } from "../redux/API";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryCardAdmin from "./CategoryCardAdmin";
const AllCategoryAdmin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        dispatch(getAllCategoryThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllCategories(res.payload.data.allCategories);
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
                        {allCategories.map((card, index) => (
                            <CategoryCardAdmin img={card?.categoryImages} name={card?.name} featured={card?.featured} categoryId={card?._id} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AllCategoryAdmin;
