import React, { useState } from "react";
import bikerec from "../assets/bikerec.png";
import rentalLogo from "../assets/rentalLogo.svg";
import { FiMapPin } from "react-icons/fi";


import arrow from "../assets/arrow-down.svg";
import mark from "../assets/mark.svg";
import DatePicker from "react-datepicker";
import "./trend.css";
import { createRentalThunk } from "../redux/rentalSubscriptionSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const RentalSubscription = () => {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [showDatePicker2, setShowDatePicker2] = useState(false);
  const [showTimePicker2, setShowTimePicker2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);

  // Inside your functional component
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCity2, setSelectedCity2] = useState(null);
  const [showCityDropdown2, setShowCityDropdown2] = useState(false);

  const cities = [
    "Bangalore",
    "Mumbai",
    "Pune",
    "Delhi",
    "Gurugram",
    "Noida",
    "Hyderabad",
    "Chennai",
    "Ghaziabad",
    "Faridabad",
    "Mysuru",
    "Chandigarh",
    "Vijaywada",
    "Nashik",
  ];

  const toggleCityDropdown = () => {
    setShowCityDropdown(!showCityDropdown);
  };

  const toggleCityDropdown2 = () => {
    setShowCityDropdown2(!showCityDropdown2);
  };
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  const handleCitySelect2 = (city) => {
    setSelectedCity2(city);
    setShowCityDropdown2(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const toggleDatePicker2 = () => {
    setShowDatePicker2(!showDatePicker2);
  };

  const toggleTimePicker2 = () => {
    setShowTimePicker2(!showTimePicker2);
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked btn")

    const fd = new FormData();
    fd.append("pickUpLocation", selectedCity);
    fd.append("dropOffLocation", selectedCity2);

    fd.append("pickUpDate", selectedDate);
    fd.append("dropOffDate", selectedDate2);

    fd.append("pickUpTime", selectedTime);
    fd.append("dropOffTime", selectedTime2);


    console.log(fd);

    dispatch(createRentalThunk(fd))
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

          setSelectedCity("")
          setSelectedCity2("")

          setSelectedTime("")
          setSelectedTime2("")

          setSelectedDate("")
          setSelectedDate2("")
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col justify-center items-center my-10 ">
          <div className=" flex flex-col md:flex-row justify-center gap-20 mx-auto mt-5">
            <div className="md:w-1/2 shadow-2xl p-5 rounded-lg">
              <div className="bg-primary rounded-lg flex sm:flex-row justify-between">
                <div
                  style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 89%, 62% 89%, 50% 100%, 38% 89%, 0 90%)" }}
                  className="bg-white rounded-lg p-5 w-full flex flex-col m-5 justify-center md:w-1/2"
                >
                  <p className="text-black text-xl text-center font-bold">Rentals</p>
                  <p className="text-black text-md text-center font-semibold">
                    For Hours & Days
                  </p>
                </div>
                <div
                  style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 89%, 62% 89%, 50% 100%, 38% 89%, 0 90%)" }}
                  className="rounded-lg p-5 w-full flex flex-col m-5 justify-center md:w-1/2"
                >
                  <p className="text-white text-center text-xl font-bold">
                    Subscriptions
                  </p>
                  <p className="text-white text-center text-md font-semibold">
                    For more than one month
                  </p>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <img src={rentalLogo} alt="logo" />
              </div>
              <p className="text-center my-3 text-gray-500">Bike Rental</p>
              <div className="">
                <div className="border w-full rounded-lg hover:bg-primary text-black transition duration-[0.3s] hover:text-white">
                  <button className="flex m-5 font-bold ">
                    <FiMapPin className="text-2xl mr-2" /> Location
                  </button>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="p-5 mt-2 w-full md:w-1/2 rounded-lg">
                    <DatePicker
                      className="w-[100%] rounded-lg"
                      selected={selectedTime}
                      onChange={(time) => setSelectedTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      placeholderText="Enter Start Time"
                      required={true}
                    />
                  </div>
                  <div className="p-5 mt-2 w-full md:w-1/2 rounded-lg">
                    <DatePicker
                      className="w-[100%] rounded-lg"
                      selected={selectedTime2}
                      onChange={(time) => setSelectedTime2(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat="h:mm aa"
                      placeholderText="Enter End Time"
                      required={true}
                    />
                  </div>
                </div>
              </div>
              <button className="border w-full p-3 mt-2 rounded-full hover:bg-primary text-black transition duration-[0.3s] hover:text-white" type="submit">Search</button>
            </div>
            <div className="md:w-1/2 mt-10">
              <img src={bikerec} alt="" className="w-full rounded-lg" />
            </div>
          </div>
          <div className="w-[80%] mx-auto m-8">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <img src={mark} alt="" />
                  <h3 className="text-primary p-4">Pick-up</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold">Locations</h3>
                    <div className="flex items-center gap-1">
                      <input
                        alt=""
                        onClick={toggleCityDropdown}
                        className="py-2 mt-2 px-2 border cursor-pointer"
                      />
                      <div className="dropdown-list">
                        <select name="city" id="city" onChange={(e) => handleCitySelect(e.target.value)}>
                          {cities.map((city) => (
                            <option value={city} >{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-2 pl-4 border-primary">
                    <h3 className="font-bold">Date</h3>
                    <div className="">
                      <DatePicker
                        selected={selectedDate}
                        className="w-[100%]"
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        required={true}
                      />
                    </div>
                  </div>

                  <div className="border-l-2 pl-4 border-primary">
                    <h3 className="font-bold">Time</h3>
                    <div className="">
                      <DatePicker
                        className="w-[100%]"
                        selected={selectedTime}
                        onChange={(time) => setSelectedTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <img src={mark} alt="" />
                  <h3 className="text-primary p-4">Drop-off</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold">Locations</h3>
                    <div className="flex items-center gap-1">
                      <input
                        alt=""
                        onClick={toggleCityDropdown2}
                        className="cursor-pointer border mt-2 py-2 px-2"
                      />

                      <div className="dropdown-list">
                        <select name="city" id="city" onChange={(e) => handleCitySelect2(e.target.value)}>
                          {cities.map((city) => (
                            <option value={city} >{city}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  <div className="border-l-2 pl-4 border-primary">
                    <h3 className="font-bold">Date</h3>
                    <div className="">
                      <DatePicker
                        selected={selectedDate2}
                        className="w-[100%]"
                        onChange={(date) => setSelectedDate2(date)}
                        dateFormat="yyyy-MM-dd"
                        required={true}
                      />
                    </div>
                  </div>

                  <div className="border-l-2 pl-4 border-primary">
                    <h3 className="font-bold">Time</h3>
                    <div className="">
                      <DatePicker
                        className="w-[100%]"
                        selected={selectedTime2}
                        onChange={(time) => setSelectedTime2(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RentalSubscription;