import React, { useEffect, useState } from 'react'
import { getAllPackageThunk } from '../redux/packageSlice';
import PackageCardAdmin from './PackageCardAdmin';
import { useDispatch } from 'react-redux';
import DefaultNavbar from '../component/Default_Navbar';
import { ColorRing } from 'react-loader-spinner';
import Footer from '../component/Footer';

const AllPackageAdmin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allPackages, setAllPackages] = useState([]);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        dispatch(getAllPackageThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllPackages(res.payload.data.packages);
                    console.log("All Packages" , res?.payload?.data?.packages)
                    setLoading(false);
                }
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    return (
        <>
            <DefaultNavbar />
            <div className="parent-container mt-40">
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
                        {allPackages.map((card, index) => (
                            <PackageCardAdmin
                                key={card._id}
                                img={card?.packageImage}
                                title={card.packageName}
                                price={card.packagePrice}
                                packageId={card._id}
                                limitProduct={card.limitProduct}
                                totalProductsCost={card.totalProductsCost}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};


export default AllPackageAdmin
