import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

import './Testimonial.css'
import Buttons from './Buttons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTestimonialThunk } from '../../redux/testimonialSlice';

const Testimonial = () => {
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (window.innerWidth > 740) {
            setCount(3);
            return;
        }
        else if (window.innerWidth > 520 && window.innerWidth < 740) {
            setCount(2);
            return;
        }
        else {
            setCount(1);
        }
    }, [])

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allTestimonials, setAllTestimonials] = useState([]);

    useEffect(() => {
        dispatch(getAllTestimonialThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllTestimonials(res.payload.data.allTestimonials);
                    setLoading(false);
                }
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }, []);

    return (
        <div className='testimonial_bg my-16 '>
            <div className='my-6 md:my-12 mx-3 md:mx-12'>
                <div className='py-2 md:py-4'>
                    {/* <h1 className='text-center text-2xl font-[Poppins] font-[500] leading-5 tracking-wider'>See What Others Are Saying</h1> */}
                    <h1 className='text-center text-primary text-4xl font-bold my-10'>Our Testimonials</h1>
                </div>

                <div className='px-2 md:px-12'>
                    <Swiper
                        slidesPerView={count}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Navigation]}
                        className="mySwiper relative"
                    >
                        {
                            allTestimonials.length > 0 ? (
                                allTestimonials.map((testimonial, index) => {
                                    return (
                                        <SwiperSlide>
                                            <div key={index} className="max-w-md py-4 px-8 bg-white shadow-2xl rounded-lg my-20">
                                                <div className="flex justify-center md:justify-end -mt-16">
                                                    <img className="w-16 h-16 object-cover rounded-full border-2 border-[#cca273]" src={testimonial?.testimonialImages[0]} alt='user_photo' />
                                                </div>
                                                <div>
                                                    <h2 className="text-gray-800 text-xl font-[500]  tracking-wide">{testimonial?.title}</h2>
                                                    <p className="mt-2 text-gray-600 ">{testimonial?.desc}</p>
                                                </div>
                                                <div className="flex justify-end mt-4">
                                                    <a href="/" className="text-xl  font-[500]  text-[#cca273]">{testimonial?.name}</a>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            ) : (<p>No Data</p>)
                        }

                        <Buttons />
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
