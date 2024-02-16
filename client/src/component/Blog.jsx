import React, { useEffect, useState } from "react";
import contactImg from "../assets/contactImg.svg";
import DefaultNavbar from "./Default_Navbar";
import Features from "./Features";
import Footer from "./Footer";
import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import userImg from "../assets/user.svg";
import calender from "../assets/calender2.svg";
import tag from "../assets/tag.svg";
import search from "../assets/search.svg";
import post1 from "../assets/post1.png";
import post2 from "../assets/post2.png";
import post3 from "../assets/post3.png";
import post4 from "../assets/post4.png";
import post5 from "../assets/post5.png";
import { getSingleBlogThunk } from "../redux/blogSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const Blog = () => {

  const { dbId } = useParams();

  console.log("id", dbId)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleBlogThunk({ dbId }))
      .then((res) => {
        if (res.payload.data.success) {
          setData(res.payload.data.blogs);
          setLoading(false);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }, [dbId])



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
            Blog
          </span>
        </h1>
      </div>
      <div className="mx-auto">

        <h1 className="text-2xl font-semibold text-center my-8 capitalize">{data?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>

      </div>
      <Features />
      <Footer />
    </>
  );
};
export default Blog;
