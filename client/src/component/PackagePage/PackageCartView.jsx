import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import CartItems from "../CartItems";
import DefaultNavbar from "../Default_Navbar";
import { getPackageCartThunk } from "../../redux/packageCartSlice";
import PackageCartItems from "./PackageCartItems";
import empty from "../../assets/empty2.webp";
import axios from "axios";
import { PackageAPI } from "../../redux/API";
import { toast } from "react-toastify";

const PackageCartView = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const cart2 = cart.cart;
    console.log("cart", cart);
    console.log("cart2", cart2);
    const [allCart, setAllCart] = useState([]);
    const [detailedCartItems, setdetailedCartItems] = useState([]);
    const [overallTotal, setOverallTotal] = useState(0);

    let packageId = localStorage.getItem("packageId")
    let pricingFormat = localStorage.getItem("pricingFormat")

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    const getCartItems = () => {
        dispatch(getPackageCartThunk())
            .then((res) => {
                setAllCart(res?.payload?.data?.cart);
                console.log("res.payload.data.cart", res.payload.data.cart)
                setdetailedCartItems(res?.payload?.data?.detailedCartItems);

                const total = res.payload.data.detailedCartItems.reduce(
                    (acc, item) => acc + item.itemTotal,
                    0
                );
                setOverallTotal(total);

                return res;
            })
            .catch((err) => {
                console.log(err);
                return err.response;
            });
    };

    useEffect(() => {
        getCartItems();
    }, []);

    const refreshCart = () => {
        getCartItems();
    };


    const [singlePackageData, setSinglePackageData] = useState()

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const headers = {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
    };

    // Handling Single Package Call
    const singlePackage = async () => {
        try {
            const response = await axios.get(
                `${PackageAPI.getSinglePackage}/${packageId}`,
                {
                    headers: headers,
                }
            );

            if (response.data.success) {
                toast.success(response?.data?.msg);
                setSinglePackageData(response?.data?.package)
                console.log("response", response?.data?.package)

            } else {
                // Notify failure
                toast.error(response.data.msg);
            }

        } catch (error) {
            console.error("Error editing product:", error);
        }
    }

    useEffect(() => {
        singlePackage();
    }, []);


    console.log(allCart);
    return (
        <>
            <DefaultNavbar />
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHN0b3JlfGVufDB8fDB8fHww"
                    alt="shop"
                    className="w-screen h-80 blur-sm object-cover"
                />
                <h1 className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-70 p-4">
                    <span className="text-white drop-shadow text-4xl font-bold">
                        Package Product Cart
                    </span>
                </h1>
            </div>
            {allCart.length > 0 ? (
                <div className="md:w-[90%] mx-auto flex flex-wrap my-10">
                    <div className="w-[95%] mx-auto lg:w-2/3 border-2 border-primary rounded-lg overflow-hidden">
                        <div className="bg-secondary">
                            <h1 className="text-2xl font-bold px-4 py-6 w-max mx-auto">
                                Products in Your Package
                            </h1>
                        </div>

                        {allCart &&
                            allCart.map((card, index) => (
                                <PackageCartItems
                                    refreshCart={refreshCart}
                                    key={index}
                                    quantity={card.quantity}
                                    price={card.product.price}
                                    name={card.product.name}
                                    description={card.product.description}
                                    image={card.product.productImages}
                                    owner={card.product?.owner?.name || "vivek"}
                                    productId={card.product._id}
                                />
                            ))}
                    </div>
                    <div className="w-[90%] mx-auto max-w-md lg:w-1/3 bg-primary flex flex-col items-center rounded-md h-fit">
                        <div className="text-2xl font-bold text-center m-3 p-4 text-white">
                            Cart Total
                        </div>

                        {/* Display overall total */}
                        {/* <div className="bt text-white text-center mt-2 mb-2 text-lg">
                            Expected Total:  <span className="text-black text-xl"> Rs {overallTotal}</span>
                        </div> */}

                        <div className="bt text-white text-center mt-4 mb-4 text-lg">
                            Pay :<span className="text-2xl"> Rs {pricingFormat === "halfYearly" ? singlePackageData.packagePrice[0] : singlePackageData.packagePrice[1]}</span> / month
                        </div>

                        <hr className="border-t-2 border-white my-2 w-full" />

                        {/* <div className={`flex flex-col gap-4 items-center justify-center mb-4 mt-2 w-full ${displayStatus}`}>
              <h2 className="text-sm">Do you have any Coupen Code ?</h2>
              <input className="w-[45%] rounded-lg p-2" onChange={(e) => setCoupenCode(e.target.value)} value={coupenCode} name="coupenCode" id="coupenCode" />
              <p className="text-xs bg-white p-2 rounded-lg cursor-pointer hover:scale-[1.06] transition-all duration-200" onClick={() => handleCoupenVerification(coupenCode)}>Apply</p>
            </div> */}

                        <Link to="/package/checkout">
                            <button
                                className="btn bg-white text-primary text-center hover:scale-110 duration-300 hover:shadow-2xl p-2 rounded-md cursor-pointer mb-5"
                            >
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl text-center my-10 text-gray-300 font-bold">
                        Cart is Empty!!
                    </h1>
                    <img src={empty} alt="" />
                    <Link to="/shop">
                        <button className="bg-primary p-3 rounded-lg hover:bg-gray-500 hover:text-white hover:no-underline text-white text-center m-4">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            )}
            <Footer />
        </>
    );
};

export default PackageCartView;
