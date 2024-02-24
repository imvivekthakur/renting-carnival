import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { ColorRing } from "react-loader-spinner";
import DefaultNavbar from '../Default_Navbar';
import ProductCard from '../DynamicProducts/ProductCard';
import Footer from '../Footer';
import { useDispatch } from 'react-redux';
import { getAllProductThunk } from '../../redux/productSlice';
import PackageProductCard from './PackageProductCard';
import { BASE_URL, PackageAPI } from '../../redux/API';
import { getPackageCartThunk } from '../../redux/packageCartSlice';
import { getAllCategoryThunk } from '../../redux/categorySlice';


const AllProductPackage = () => {

    const dispatch = useDispatch();
    let packageId = localStorage.getItem("packageId")
    let pricingFormat = localStorage.getItem("pricingFormat")

    useEffect(() => {
        dispatch(getAllProductThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllProducts(res.payload.data.products);
                    setLoading(false);
                }
                return res;
            })
            .catch((err) => {
                return err.response;
            });


    }, []);

    const [allProducts, setAllProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("popular");
    const [filteredProduct, setFilteredProduct] = useState(allProducts);
    const [packageData, setPackageData] = useState()
    const [allPackageCart, setAllPackageCart] = useState([]);



    useEffect(() => {
        const fetchSinglePackage = async () => {
            try {
                const res = await fetch(
                    `${PackageAPI.getSinglePackage}/${packageId}`
                );
                const data = await res.json();
                if (!data) {
                    console.log("package details could not pe loaded");
                } else {
                    setPackageData(data?.package);
                    console.log("packageData", data?.package)

                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSinglePackage();
    }, []);



    const getPackageCartItems = () => {
        dispatch(getPackageCartThunk())
            .then((res) => {
                setAllPackageCart(res.payload.data.cart);

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
        getPackageCartItems();
    }, []);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);


    useEffect(() => {
        filterProduct(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            setFilteredProduct(allProducts);
        }
    }, [allProducts]);

    const filterProduct = (selectedCategory) => {
        if (selectedCategory === "popular") {
            setFilteredProduct(allProducts);
        } else {
            const filteredItems = allProducts.filter(
                (item) => item.category === selectedCategory
            );
            console.log("filtered items ", filteredItems);
            setFilteredProduct(filteredItems);
        }
    };

    const itemsPerPage = 8;
    const pageCount = Math.ceil(filteredProduct.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProduct.slice(startIndex, endIndex);

    // category dynamic
    const [allCategories, setAllCategories] = useState([]);

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

    console.log(currentProducts);
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
                        All Products for Package
                    </span>
                </h1>
            </div>
            <div className="text-sm w-[90%] mx-auto mt-8">
                <div>
                    <button
                        className={`mr-4 mt-4 border-2 border-primary px-4 py-2 rounded-full ${selectedCategory === "popular" ? "bg-primary text-white" : ""
                            }`}
                        onClick={() => setSelectedCategory("popular")}
                    >
                        All
                    </button>
                    {
                        allCategories?.map((category, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`mr-4 mt-4 border-2 border-primary px-4 py-2 rounded-full ${selectedCategory === category.name ? "bg-primary text-white" : ""
                                        }`}
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    {category.name}
                                </button>
                            )
                        })
                    }
                </div>
                <br />
                <div>
                    <div className="mr-4 mt-4 border-0 border-b-2 border-primary px-4 py-2 text-black text-xl w-fit">
                        Total Items in Cart : <span className='text-green-500 font-medium'>{allPackageCart?.length}</span> / {packageData?.limitProduct}
                    </div>

                    <div className="mr-4 mt-4 border-0 border-b-2 border-primary px-4 py-2 text-black text-xl w-fit">
                        Your Billing Cycle : <span className='text-green-500 font-medium'>{pricingFormat === "halfYearly" ? "Half Yearly" : "Yearly"}</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] mx-auto">
                {currentProducts.length > 0 ? (
                    currentProducts.map((card, index) => (
                        <div className="mt-20" key={card._id}>
                            <PackageProductCard
                                img={card.productImages}
                                title={card.name}
                                desc={card.description}
                                price={card.price}
                                stock={card.stock}
                                category={card.category}
                                seller={card.owner.name}
                                productId={card._id}
                                packageId={packageId}
                                pricingFormat={pricingFormat}
                            />
                        </div>
                    ))
                ) : (
                    <div className="loader-container w-full h-full flex items-center justify-center">
                        {/* <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: "200px", // Add this line to set a minimum height
                            }}
                            wrapperClass="color-ring-wrapper"
                            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                        /> */}
                        <p className='text-[#cda274] text-center md:text-4xl text-2xl font-bold my-10'>No Products found </p>
                    </div>
                )}
            </div>
            <div className="flex justify-center items-center m-10 mb-16">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination flex space-x-3 text-xl"
                    previousLinkClassName="prev bg-secondary rounded-full px-3 py-1 hover:bg-primary hover:text-white duration-300"
                    nextLinkClassName="next bg-secondary rounded-full px-3 py-1 hover:bg-primary hover:text-white duration-300"
                    pageLinkClassName="page-link bg-secondary rounded-lg hover:text-white hover:bg-primary px-3 py-1 duration-300"
                    activeLinkClassName="active border-2 border-primary"
                    breakLinkClassName="text-primary"
                />
            </div>
            <Footer />
        </>
    );
}

export default AllProductPackage
