import React from 'react'
import { IoPricetagOutline } from "react-icons/io5";
import combo1 from '../assets/combo1.png'
function Combo() {
    const listCombo = [
        {
            image: combo1,
            name: "COMBO Bear Po (limited)",
            price: "19.99",
        },
        {
            image: combo1,
            name: "COMBO Nóng bỏng",
            price: "19.99",
        },
        {
            image: combo1,
            name: "COMBO Bí mật",
            price: "19.99",
        },
        {
            image: combo1,
            name: "COMBO hạnh phúc",
            price: "19.99",
        },
        {
            image: combo1,
            name: "COMBO ngọt ngào",
            price: "19.99",
        },
        {
            image: combo1,
            name: "COMBO Nóng bỏng",
            price: "19.99",
        },
        {
            image: combo1,
            name: "COMBO Nóng bỏng",
            price: "19.99",
        },
        {
            image: combo1,
            name: "COMBO Nóng bỏng",
            price: "19.99",
        }
    ]
    return (
        <>
            <div className='row' style={{ height: "5em" }}>
                <div className='col-sm-12' style={{ backgroundColor: "#057130" }}>
                </div>
            </div>
            <div className='row h-auto '>
                <div className='col-sm-12 py-5 text-center'>
                    <h3 className='fw-bold'>COMBO BEAR PO</h3>
                </div>
            </div>
            <div className='row h-auto pb-4 d-flex justify-content-center'>
                <div className='col-sm-10'>
                    <div className='row w-100' >
                        {listCombo.map((c, index) => {
                            return (
                                <div className="col-sm-2 mb-4" style={{height:"17em"}} key={index}>
                                    <div className="card w-100 mx-auto border-0" style={{height:"100%"}}>
                                        <img src={c.image} style={{ width: "10em" }} className="card-img-top img-fluid mx-auto pt-1" alt="Product Image" />
                                        <div className="card-body">
                                            <h5 className="card-title" style={{lineHeight:"20px", height:"40px", fontSize:"16px",overflow: "hidden",display: "-webkit-box",WebkitBoxOrient: "vertical", WebkitLineClamp: 2}}>{c.name}</h5>
                                            {/* <br /> */}
                                            <p className="card-text mt-3"><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> {c.price}</span><span className='text-black-50'> VND</span></p>
                                            {/* <a href="#" className="btn btn-success">Add to Cart</a> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
            <div className='row' style={{ height: "5em" }}>
                <div className='col-sm-12' style={{ backgroundColor: "#057130" }}>
                </div>
            </div>
        </>
    )
}

export default Combo