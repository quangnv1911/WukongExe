import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoPricetagOutline } from "react-icons/io5";
import voucher1 from '../assets/voucher1.png';
import voucher2 from '../assets/voucher2.png';
import { BACK_END_HOST } from '../utils/AppConfig'
function Voucher() {
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACK_END_HOST}/voucher`)
            .then(res => {
                setVouchers(res.data); // Cập nhật danh sách voucher từ API
                setIsLoading(false); // Đánh dấu rằng dữ liệu đã được tải
            })
            .catch(error => {
                console.error('Error fetching vouchers:', error);
                setIsLoading(false); // Đánh dấu đã hoàn thành tải dữ liệu, dù có lỗi
            });
    }, []);

    // Nếu đang tải, có thể hiển thị một thông báo hoặc spinner
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='row h-auto' style={{ margin: '40px 20%' }}>
                <div className='col-sm-12 py-2 px-3 text-center' style={{ backgroundColor: '#ffcb03', color: '#063e57' }}>
                    <h3 className='fw-bold'>KHUYẾN MÃI</h3>
                </div>
            </div>
            <div className='row h-auto pb-4 d-flex justify-content-center' style={{ marginLeft: '12px' }}>
                <div className='col-sm-10'>
                    <div className='row w-100'>
                        {vouchers.map((voucher) => {
                            return (
                                <div className="col-sm-4 mb-4" key={voucher._id}>
                                    <div className="card w-100 mx-auto border-0 bg-transparent">
                                        <img style={{ width: "95%" }} src={voucher.image || voucher1} className="card-img-top img-fluid mx-auto pt-1" alt="Voucher" />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ lineHeight: "20px", height: "20px", fontSize: "16px", overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 1 }}>
                                                {voucher.name}
                                            </h5>
                                            <p className="card-text mt-3">Mã voucher: {voucher.code}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Voucher;
