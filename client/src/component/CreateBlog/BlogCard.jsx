import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartThunk, removeFromCartThunk } from "../../redux/cartSlice";
import {
    addToWishlistThunk,
    getWishlistThunk,
} from "../../redux/wishlistSlice";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import "../../App.css";

const BlogCard = ({
    img,
    description,
    title,
    blogId,
}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        if (img && img.length > 0) {
            setSelectedImage(img[0]); // Set the first image as the selected image
        }
    }, [img]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    // console.log("images ", img);
    return (
        <div className="product-card-link">
            <div className="rounded-lg overflow-hidden bg-gray-100 product-card h-[34rem]">
                <div className="hover-button">
                    {(loading || loading2) && (
                        <div className="loader-container hover-button ">
                            <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                wrapperClass="color-ring-wrapper"
                                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                            />
                        </div>
                    )}
                </div>
                <NavLink to={`/blog/${blogId}`}>
                    <div className="gradient-container">
                        <img
                            src={selectedImage}
                            alt="blog"
                            className="object-cover h-64 w-full"
                        />
                    </div>
                </NavLink>
                <div className="p-4">
                    <h1 className="text-lg font-bold p-1">{title}</h1>
                    <p className="text-sm p-1">
                        <div dangerouslySetInnerHTML={{ __html: description }}></div>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
