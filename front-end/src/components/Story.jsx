import React from 'react';
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import banana from '../assets/banana.png';
import apple from '../assets/apple.png';
import { FormControl } from 'react-bootstrap';
import ListCarousel from './ListCarousel';

function Story() {
    return (
        <div className='row d-flex py-4' style={{ height: "auto" }}>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                <div className='row h-100'>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-3 position-relative px-0'>
                        <div className='w-100' style={{ height: "80%" }}>
                            <div className='rounded-end-pill position-absolute' style={{
                                backgroundColor: "#82b897", height: "20vh", width: "150%",
                                transform: "rotate(-30deg)", top: "20%", left: "-60%"
                            }}>
                            </div>
                        </div>
                        <div style={{ height: "20%" }} className='row d-flex justify-content-center align-items-center'>
                            <div className='w-100 h-100 p-1'>
                                <button className='d-flex align-items-center p-1 pe-2 rounded-5' style={{ width: "auto", fontSize: "15px", border: "1px solid green" }}>
                                    <FaFacebook className='mx-2' style={{ color: "blue" }} />
                                    <label className='fw-semibold' style={{ color: "green" }}>
                                        <a 
                                            style={{
                                                color: 'green',
                                                textDecoration: 'none'
                                            }} 
                                            href='https://www.facebook.com/profile.php?id=61559747398038&mibextid=LQQJ4d'
                                            target="_blank"
                                            >
                                            Chat Facebook
                                        </a>
                                    </label>
                                </button>
                                <button className='d-flex align-items-center p-1 pe-2 my-2 rounded-5' style={{ width: "auto", fontSize: "15px", border: "1px solid green" }}>
                                    <SiZalo className='mx-2' style={{ color: "blue" }} />
                                    <label className='fw-semibold' style={{ color: "green" }}>098 5185854</label>
                                </button>
                                <button className='d-flex align-items-center p-1 pe-2 rounded-5' style={{ width: "auto", fontSize: "15px", border: "1px solid green" }}>
                                    <FaPhoneAlt className='mx-2' style={{ color: "green" }} />
                                    <label className='fw-semibold' style={{ color: "green" }}>098 5185854</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-9 h-100'>
                        <div>
                            <h1 style={{ width: "70%" }}>
                                Hành trình <span style={{ color: "green" }}>TÌM KIẾM </span>
                                <span>ĐỒ ĂN VẶT <img src={banana} alt="Banana" style={{ width: '80px', height: 'auto' }} /><span> </span><img src={apple} alt="Apple" style={{ width: '80px', height: 'auto' }} /></span>
                                <span style={{ color: "green" }}> cùng Bear Po</span>
                            </h1>
                            <p className='my-4'>
                                Trong hành trình "<strong>du học</strong>" đầy ý nghĩa của mình, Bear Po - chú gấu trúc đáng yêu và biểu tượng của sự hữu nghị, không chỉ mang theo vali đồ ăn vặt đặc sắc mà còn mang theo thông điệp về sự gắn kết, hợp tác - một "<strong>bộ trưởng bộ ngoại giao</strong>" thứ thiệt.<br /><br />Gấu trúc Bear Po đến với Hoà Lạc không chỉ nhận được sự chào đón nồng nhiệt từ bạn bè Việt Nam mà còn cảm nhận được sự tò mò và hứng thú về những món quà văn hóa mà chú mang theo. Vali của “<strong>Bear Po</strong>” không chỉ chứa đựng những món ăn vặt thơm ngon mà còn chứa đựng cả hương vị truyền thống của xứ Trung Hoa.
                                <br /> <br />Hãy cùng chúng mình khám phá, “<strong>Website đồ ăn vặt của Bear Po</strong>” có gì nào!!!!
                            </p>
                            <form>
                                <div className='d-flex align-items-center'>
                                    <FormControl className='d-inline-block' type='text' placeholder='Gọi món' style={{ width: "80%" }} />
                                    <button className='btn btn-dark ms-3' style={{ width: "20%" }}>Tìm kiếm</button>
                                </div>
                            </form>
                            <br />
                            <h5 className='fw-bold'>DỊCH VỤ</h5>
                            <p><span className='text-secondary'>Giao Hàng Nhanh Dịch</span><span className='mx-2' style={{ color: "#FC8019" }}> Vụ Giao Hàng Bí Mật</span><span className='text-secondary'> Thanh Toán</span><span className='mx-2' style={{ color: "#FC8019" }}> COMBO đồ ăn</span></p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12' >
                <div className='my-4'>
                    <ListCarousel />
                </div>
            </div>
        </div>
    )
}

export default Story;
