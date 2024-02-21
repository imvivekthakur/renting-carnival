import React, { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import "./trend.css"
import axios, { all } from "axios";
import { getAllRoomThunk } from "../redux/roomSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Rooms = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [allRooms, setAllRooms] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoomThunk())
      .then((res) => {
        if (res.payload.data.success) {
          setAllRooms(res.payload.data.allRooms);
          setLoading(false);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }, []);


  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        50+ Beautiful rooms
        <br />
        inspiration
      </h2>
      <p className="text-xl font-semibold mb-4 text-center">
        Our designer already made a lot of beautiful
        <br />
        prototypes of rooms that inspire you
      </p>
      <Carousel responsive={responsive} containerClass="carousel-container" infinite={true} autoPlay autoPlaySpeed={2000} >
        {
          allRooms?.length > 0 ? (
            allRooms?.map((room, index) => (
              <div key={index} className="room-item bg-white border-gray-300 rounded p-4">
                <img src={room?.roomImages[0]} alt={"Room " + (index + 1)} className="w-full h-[372px] p-2" />
                <p className="font-bold">{room?.heading}</p>
              </div>
            ))
          ) : (<p className="text-2xl text-black">No Rooms Available</p>)
        }

      </Carousel>

      <Link to={'/allRooms'}>
        <div className="flex justify-center">
          <button className="bg-primary p-3 rounded-lg hover:bg-gray-500 hover:text-white hover:no-underline text-white text-center m-2">
            Explore More
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Rooms;
