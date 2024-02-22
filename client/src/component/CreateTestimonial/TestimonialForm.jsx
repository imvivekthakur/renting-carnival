import React, { useState, useEffect } from "react";
import DefaultNavbar from "../Default_Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import { createTestimonialThunk } from "../../redux/testimonialSlice";

const TestimonialForm = () => {
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
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");

    const handleSendImage = (e, index) => {
        const newSendImages = [...sendImages];
        newSendImages[index] = e.target.files[0];
        setSendImages(newSendImages);

        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = URL.createObjectURL(e.target.files[0]);
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
        fd.append("name", name);
        fd.append("title", title);
        fd.append("desc", desc);

        sendImages.forEach((image, index) => {
            if (image) {
                fd.append("testimonialImages", image);
            }
        });
        console.log(fd);

        dispatch(createTestimonialThunk(fd))
            .then((res) => {
                if (res.payload.data.success) {
                    toast.success(`${res.payload.data.msg}`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    // Reset form fields
                    setName("");
                    setDesc("");
                    setTitle("");
                    setSendImages("");
                } else {
                    toast.error(`${res.payload.data.msg}`, {
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
                <h2 className="text-2xl font-bold text-center mb-4">Add Testimonial</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 gap-2">
                        <div className=" mb-3">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Name:
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

                        <div className="flex-1 mb-3">
                            <label
                                htmlFor="desc"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Description:
                            </label>
                            <textarea
                                id="desc"
                                name="desc"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="form-textarea mt-1 block w-full"
                                required
                            />
                        </div>

                        <div className="flex-1 mb-3">
                            <label
                                htmlFor="desc"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Title:
                            </label>
                            <textarea
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-textarea mt-1 block w-full"
                                required
                            />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="photos"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Upload Photo:
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
                        Add Testimonial
                    </button>
                </form>
            </div>

            <ToastContainer />
            <Footer />
        </>
    );
};

export default TestimonialForm;
