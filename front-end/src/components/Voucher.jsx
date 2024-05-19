import React from 'react'
import { IoPricetagOutline } from "react-icons/io5";
import voucher1 from '../assets/voucher1.png'
import voucher2 from '../assets/voucher2.png'
function Voucher() {
    const listVoucher = [
        {
            image: voucher1,
            name: "Thứ 3, Ăn no nê thả ga",
        },
        {
            image: voucher2,
            name: "Freeship từ ngày 26/06-15/07",
        },
        {
            image: voucher1,
            name: "Siêu tiệc giảm 35.000 đồng",
        },
        {
            image: voucher2,
            name: "Đặt hàng Online Trúng ngay quà tặng",
        },
        {
            image: voucher2,
            name: "Quán mới lên sàn deal",
        },
        {
            image: voucher2,
            name: "Đặt hàng ngay thôi!!!!!",
        }
    ]
    return (
        <>
            {/* <div className='row h-auto'>
                <div className='col-sm-12 py-5 text-center'>
                    <h3 className='fw-bold'>KHUYẾN MÃI</h3>
                </div>
            </div>
            <div className='row h-auto pb-4 d-flex justify-content-center'>
                <div className='col-sm-10'>
                    <div className='row w-100'>
                        {listVoucher.map((c, index) => {
                            return (
                                <div className="col-sm-4 mb-4" key={index}>
                                    <div className="card w-100 mx-auto border-0 bg-transparent">
                                        <img style={{width:"95%"}} src={c.image} className="card-img-top img-fluid mx-auto pt-1" alt="Product Image" />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{lineHeight:"20px", height:"20px", fontSize:"16px",overflow: "hidden",display: "-webkit-box",WebkitBoxOrient: "vertical", WebkitLineClamp: 1}}>{c.name}</h5>
                                            <p className="card-text mt-3" style={{ color: "#057130" }}>voucher</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div> */}
            
        </>
    )
}

export default Voucher