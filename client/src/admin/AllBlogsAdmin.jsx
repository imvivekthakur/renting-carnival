import React, { useEffect, useState } from 'react'
import DefaultNavbar from '../component/Default_Navbar';
import ReactPaginate from 'react-paginate';
import Footer from '../component/Footer';
import { ColorRing } from 'react-loader-spinner';
import BlogCardAdmin from './BlogCardAdmin';

const AllBlogsAdmin = ({ allBlogs }) => {
    console.log("All Blogs", allBlogs)

    const [selectedCategory, setSelectedCategory] = useState("popular");

    const [display, setDisplay] = useState(1);
    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);


    const itemsPerPage = 6;
    const pageCount = Math.ceil(allBlogs.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    console.log(allBlogs);
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
                        All Blogs
                    </span>
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] mx-auto">
                {allBlogs.length > 0 ? (
                    allBlogs.map((card, index) => (
                        <div className="mt-20" key={card._id}>
                            <BlogCardAdmin
                                img={card?.blogImages}
                                title={card?.title}
                                description={card?.description}
                                shortDescription={card?.shortDescription}
                                blogId={card?._id}
                            />
                        </div>
                    ))
                ) : (
                    <div className="loader-container w-full h-full flex items-center justify-center">
                        <ColorRing
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
                        />
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

export default AllBlogsAdmin
