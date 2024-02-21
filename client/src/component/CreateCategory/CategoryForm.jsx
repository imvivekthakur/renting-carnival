import React, { useState, useEffect } from "react";
import DefaultNavbar from "../Default_Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import { createCategoryThunk } from "../../redux/categorySlice";
import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const CategoryForm = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const [sendImages, setSendImages] = useState(Array(1).fill(null));
    const [imagePreviews, setImagePreviews] = useState(Array(1).fill(null));
    const [name, setName] = useState("");
    const [featured, setFeatured] = useState("");
    const editor = useRef(null);

    const handleSendImage = (e, index) => {
        const newSendImages = [...sendImages];
        newSendImages[index] = e.target.files[0];
        setSendImages(newSendImages);

        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = URL.createObjectURL(e.target.files[0]);
        setImagePreviews(newImagePreviews);
    };

    const handleRemoveImage = (index) => {
        const newSendImages = [...sendImages];
        newSendImages[index] = null;
        setSendImages(newSendImages);

        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = null;
        setImagePreviews(newImagePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (sendImages.some((image) => image === null)) {
            toast.error("Please select all five images.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const fd = new FormData();
        console.log("before append", fd);


        fd.append("name", name);
        fd.append("featured", featured);

        sendImages.forEach((image, index) => {
            if (image) {
                fd.append("categoryImages", image);
                // fd.blogImages = image
            }
        });
        console.log("after append", fd);

        dispatch(createCategoryThunk(fd))
            .then((res) => {
                if (res.payload.data.success) {
                    toast.success(`${res.payload.data.message}`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    // Reset form fields
                    setName("");
                    setSendImages("");
                    setFeatured("")
                } else {
                    toast.error(`${res.payload.data.message}`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    };
    return (
        <>
            <DefaultNavbar />
            <div className=" w-auto mx-auto p-7 bg-white shadow-md mt-40  rounded">
                <h2 className="text-2xl font-bold text-center mb-4">Add Category</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 gap-2">
                        <div className=" mb-3">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Category Title:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-input mt-1 block w-full"
                                required
                            />
                        </div>
                        <div className=" mb-3">
                            <label
                                htmlFor="stock"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Featured this category ?
                            </label>
                            <select onChange={(e) => setFeatured(e.target.value)} className="form-input mt-1 block w-[50%]" id="featured" name="featured" value={featured} required>
                                <option value={""}>Select Option</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>

                        </div>
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="photos"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Upload Thumbnail of Category :
                        </label>

                        <div className="flex flex-wrap">
                            {sendImages &&
                                sendImages.map((image, index) => (
                                    <div key={index} className="mb-3">
                                        {imagePreviews[index] && (
                                            <img
                                                src={imagePreviews[index]}
                                                alt={`Preview ${index}`}
                                                className="mb-2 w-60 h-60"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            name={`file${index}`}
                                            accept="image/png, image/jpg, image/jpeg"
                                            onChange={(e) => handleSendImage(e, index)}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full p-4 border rounded-lg bg-primary  hover:bg-gray-700 hover:text-white"
                    >
                        Add Category
                    </button>
                </form>
            </div>

            <ToastContainer />
            <Footer />
        </>
    );
};

export default CategoryForm;

