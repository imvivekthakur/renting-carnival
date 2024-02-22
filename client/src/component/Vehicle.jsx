import React, { useEffect, useState } from 'react'
import DefaultNavbar from './Default_Navbar'
import Footer from './Footer'
import Trend from './Trend'
import Working from './Working'
import RentalSubscription from './RentalSubscription'

import arrow from "../assets/arrow-down.svg";
import mark from "../assets/mark.svg";
import DatePicker from "react-datepicker";
import "./trend.css";

const Vehicle = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


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
            Vehicles
          </span>
        </h1>
      </div>
      <RentalSubscription />
      <Working />
      <Footer />
    </>
  )
}

export default Vehicle