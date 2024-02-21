import React, { useEffect, useState } from 'react'
import { getAllCoupenThunk } from '../redux/coupenSlice';
import { useDispatch } from 'react-redux';

const AllCouponBanner = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [allCoupens, setAllCoupens] = useState([]);

    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        dispatch(getAllCoupenThunk())
            .then((res) => {
                if (res.payload.data.success) {
                    setAllCoupens(res.payload.data.allCoupens);
                    setLoading(false);
                }
                return res;
            })
            .catch((err) => {
                return err.response;
            });
    }, []);
    return (
        <div className='mt-12 py-8 w-[92%] mx-auto h-[300px] flex flex-col gap-4'>
            <h2 className='pl-6 text-2xl font-plus-jakarta-sans'>Offers and Discount</h2>
            <div className='pl-6 flex flex-row  gap-6'>

                {
                    allCoupens.map((coupen, index) => {
                        return (
                            <div key={index} className='min-w-[200px] max-w-[300px] border px-4 py-2 flex flex-col gap-2 justify-center shadow-xl bg-[#cca273] rounded-lg hover:scale-[1.05] hover:shadow-sm duration-200 transition-all cursor-pointer'>
                                <p className='font-bold'>{coupen?.coupenCode}</p>
                                <p className='text-xs font-light text-[#181717]'>{coupen?.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllCouponBanner
