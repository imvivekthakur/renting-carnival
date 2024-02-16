import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { deleteBlogThunk } from "../redux/blogSlice";
import { toast } from "react-hot-toast"

const BlogCardAdmin = ({
    img,
    description,
    shortDescription,
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

    const handleDelete = async () => {
        try {
            dispatch(deleteBlogThunk({ dbId }))
                .then((res) => {
                    if (res.payload.data.success) {
                        setLoading(false);
                        toast.success(res?.payload?.data?.success)

                    }
                    return res;
                })
                .catch((err) => {
                    toast.error(err)
                    return err.response;
                });
        } catch (error) {
            console.error("Error deleting blog:", error);
            // Handle error, notify user, etc.
        }
    };

    // console.log("images ", img);
    return (
        <div className="product-card-link">
            <div className="rounded-lg overflow-hidden bg-gray-100 product-card h-fit min-h-[400px]">
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
                    <p className="text-sm p-1">{shortDescription}</p>
                </div>
                <button className="bg-red-600 p-3 rounded-lg hover:bg-primary hover:text-white hover:no-underline text-white text-center m-4" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BlogCardAdmin;
