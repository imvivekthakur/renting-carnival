import React, { useState, useEffect } from "react";
import DefaultNavbar from "../Default_Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { createProductThunk } from "../../redux/productSlice";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import { getAllCategoryThunk } from "../../redux/categorySlice";
import { createPackageThunk } from "../../redux/packageSlice";

const PackageForm = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const [sendImages, setSendImages] = useState(Array(1).fill(null));
    const [imagePreviews, setImagePreviews] = useState(Array(5).fill(null));
    const [packageName, setPackageName] = useState("");
    const [packagePrice, setPackagePrice] = useState(Array(2).fill(null));
    const [totalProductsCost, setTotalProductsCost] = useState();
    const [limitProduct, setLimitProduct] = useState("");

    const handleSendImage = (e, index) => {
        const newSendImages = [...sendImages];
        newSendImages[index] = e.target.files[0];
        setSendImages(newSendImages);

        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = URL.createObjectURL(e.target.files[0]);
        setImagePreviews(newImagePreviews);
    };

    const handlePriceChange = (e, index) => {
        const newPriceArray = [...packagePrice]
        newPriceArray[index] = e.target.value
        setPackagePrice(newPriceArray)
    }

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

        if (packagePrice.some((singlePrice) => singlePrice === null)) {
            toast.error("Please enter all months packagePrice.", {
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
        fd.append("packageName", packageName);
        fd.append("limitProduct", limitProduct);
        fd.append("totalProductsCost", totalProductsCost);

        sendImages.forEach((image, index) => {
            if (image) {
                fd.append("packageImage", image);
            }
        });

        packagePrice.forEach((singlePrice) => {
            if (singlePrice) {
                fd.append("packagePrice", singlePrice);
            }
        });
        console.log(fd);

        dispatch(createPackageThunk(fd))
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
                    setPackageName("");
                    setLimitProduct("");
                    setSendImages("");
                    setTotalProductsCost()
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
                <h2 className="text-2xl font-bold text-center mb-4">Add Package</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 gap-2">
                        <div className=" mb-3">
                            <label
                                htmlFor="packageName"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Package Name:
                            </label>
                            <input
                                type="text"
                                id="packageName"
                                name="packageName"
                                value={packageName}
                                onChange={(e) => setPackageName(e.target.value)}
                                className="form-input mt-1 block w-full"
                                required
                            />
                        </div>

                        <div className=" mb-3">
                            <label
                                htmlFor="packagePrice"
                                className="text-sm font-medium text-gray-600"
                            >
                                Price:
                            </label>
                            {packagePrice &&
                                packagePrice.map((packagePrice, index) => (
                                    <div key={index} className="mb-3 inline">
                                        <label htmlFor="packagePrice" className="mx-2 ml-4 text-sm font-medium text-gray-600">For {index == 0 ? ("6") : index == 1 ? ("12") : ("")} Months :</label>
                                        <input
                                            type="number"
                                            id="packagePrice"
                                            name="packagePrice"
                                            value={packagePrice}
                                            onChange={(e) => handlePriceChange(e, index)}
                                            className="form-input mt-1 w-[10%]"
                                            required
                                        />
                                    </div>
                                ))}
                        </div>

                        <div className=" mb-3">
                            <label
                                htmlFor="tag"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Limit of Products :
                            </label>
                            <input
                                type="number"
                                id="limitProduct"
                                name="limitProduct"
                                value={limitProduct}
                                onChange={(e) => setLimitProduct(e.target.value)}
                                className="form-input mt-1 block w-[40%]"
                            />
                        </div>

                        <div className=" mb-3">
                            <label
                                htmlFor="tag"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Total Cost of Products :
                            </label>
                            <input
                                type="number"
                                id="totalProductsCost"
                                name="totalProductsCost"
                                value={totalProductsCost}
                                onChange={(e) => setTotalProductsCost(e.target.value)}
                                className="form-input mt-1 block w-[40%]"
                            />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="photos"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Upload Photo of Package :
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
                        Add Package
                    </button>
                </form>
            </div>

            <ToastContainer />
            <Footer />
        </>
    );
};

export default PackageForm;

