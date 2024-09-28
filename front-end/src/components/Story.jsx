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
                                backgroundColor: "#ffcb03", height: "20vh", width: "150%",
                                transform: "rotate(-30deg)", top: "20%", left: "-60%"
                            }}>
                            </div>
                        </div>
                        <div style={{ height: "20%" }} className='row d-flex justify-content-center align-items-center'>
                            <div className='w-100 h-100 p-1'>
                                <button className='d-flex align-items-center p-1 pe-2 rounded-5' style={{ width: "auto", fontSize: "15px", border: "1px solid #ffcb03", backgroundColor: '#ffcb03' }}>
                                    <FaFacebook className='mx-2' style={{ color: "black" }} />
                                    <label className='fw-semibold' style={{ color: "white" }}>
                                        <a 
                                            style={{
                                                color: 'white',
                                                textDecoration: 'none'
                                            }} 
                                            href='https://www.facebook.com/profile.php?id=61565933736328'
                                            target="_blank"
                                            >
                                            Chat Facebook
                                        </a>
                                    </label>
                                </button>
                                <button className='d-flex align-items-center p-1 pe-2 my-2 rounded-5' style={{ width: "auto", fontSize: "15px", border: "1px solid #ffcb03", backgroundColor: '#ffcb03'  }}>
                                    <SiZalo className='mx-2' style={{ color: "black" }} />
                                    <label className='fw-semibold' style={{ color: "white" }}>081 825 1203</label>
                                </button>
                                <button className='d-flex align-items-center p-1 pe-2 rounded-5' style={{ width: "auto", fontSize: "15px", border: "1px solid #ffcb03",backgroundColor: '#ffcb03'  }}>
                                    <FaPhoneAlt className='mx-2' style={{ color: "black" }} />
                                    <label className='fw-semibold' style={{ color: "white" }}>081 825 1203</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-9 h-100'>
                        <div>
                            <h1 style={{ width: "70%" }}>
                                Hành trình <span style={{ color: "#ffcb03" }}>TÌM KIẾM </span>
                                <span>ĐỒ ĂN VẶT <img src={banana} alt="Banana" style={{ width: '80px', height: 'auto' }} /><span> </span><img src={apple} alt="Apple" style={{ width: '80px', height: 'auto' }} /></span>
                                <span style={{ color: "#ffcb03" }}> cùng Wukong Food</span>
                            </h1>
                            <p className='my-4'>
                            Trong cuộc phiêu lưu "thực thần" đầy hứng khởi của mình, <strong>Wukong - Tôn Ngộ Không</strong> tinh nghịch không chỉ mang theo chiếc gậy như ý thần thông mà còn đem theo một "vali thần kỳ" chứa đầy đồ ăn vặt tuyệt hảo. Chú khỉ đá tinh quái này, vốn nổi tiếng với tài "đại náo thiên cung", giờ đây trở thành một "<strong>đại sứ ẩm thực</strong>" đích thực, kết nối văn hóa qua từng món ăn ngon.
Khi Wukong đặt chân đến thị trường Việt Nam, không chỉ gây được sự chú ý bởi ngoại hình độc đáo mà còn bởi hương vị đặc sắc trong chiếc vali kỳ diệu của mình. "<strong>Vali thần kỳ</strong>" của Wukong không đơn thuần chứa đựng những món ăn vặt thơm ngon, mà còn ẩn chứa cả tinh hoa ẩm thực và văn hóa Trung Hoa cổ đại.
Hãy cùng khám phá "<strong>Thiên đường đồ ăn vặt của Wukong</strong>" - nơi hội tụ những món ngon truyền thống và hiện đại, từ bánh Trung Thu thơm ngon đến kẹo sữa dê Tây Tạng độc đáo. Mỗi món ăn là một chuyến phiêu lưu vị giác, đưa bạn chu du qua những vùng đất huyền bí trong truyện Tây Du Ký!
                            </p>
                           
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
