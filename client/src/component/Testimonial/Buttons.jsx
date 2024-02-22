import React from 'react'
import { useSwiper } from 'swiper/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const Buttons = () => {
    const swiper = useSwiper();

    return (
        <div className='gap-6 hidden md:flex'>
            <button className='border-2 border-gray-700 rounded-full p-2 cursor-pointer' onClick={() => swiper.slidePrev()}><AiOutlineLeft onClick={() => swiper.slidePrev()} /></button>
            <button className='rounded-full border-2 border-gray-700 p-2 cursor-pointer' onClick={() => swiper.slideNext()}><AiOutlineRight onClick={() => swiper.slideNext()} /></button>
        </div>
    )
}

export default Buttons
