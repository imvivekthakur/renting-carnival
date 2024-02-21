import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getAllCategoryThunk } from "../redux/categorySlice";
import { useDispatch } from "react-redux";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeaturedCategories = () => {
    const [allCategories, setAllCategories] = useState([]);

    const dispatch = useDispatch();

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

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="w-[90%] mx-auto">
            <h1 className="text-4xl text-[#CDA274] font-bold m-8 text-center">
                Featured Categories
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    allCategories?.map((category, index) => {
                        console.log("category", category)
                        let categoryName = category.name
                        categoryName = categoryName.replace(" ", "-")
                        if (category.featured === "Yes") {
                            return (
                                <Carousel autoPlay={true}
                                    autoPlaySpeed={2000}
                                    rewind={true}
                                    rewindWithAnimation={true}
                                    responsive={responsive}>
                                    <div>
                                        <Link to={`/category/${categoryName}`} key={index}>
                                            <img
                                                className="w-full h-64 object-cover rounded-lg cursor-pointer hover:scale-105 duration-200"
                                                src={category?.categoryImages[0]}
                                                alt="Bedroom"
                                            />
                                        </Link>
                                        <div className="text-center m-4 font-bold text-xl">{category?.name}</div>
                                    </div>
                                </Carousel>
                            )
                        } else {
                        }

                    })
                }
            </div>
        </div>
    );
};

export default FeaturedCategories;
