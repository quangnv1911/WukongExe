import React from 'react';
import logo from '../assets/logo.png';
import face from '../assets/face.png';
import inta from '../assets/inta.png';
import tiktok from '../assets/tiktok.png';
import zalo from '../assets/zalo.png';
import tele from '../assets/tele.png';

function Footer() {
    return (
        <div className='row d-flex p-4' style={{ backgroundColor: "#282828", color: 'hsla(0, 0%, 100%, .5'}}>
            <div className='col-lg-3 col-md-6 col-sm-6 col-12 text-center mb-4'>
                <img src={logo} width={240} className='img-fluid' alt="Logo" />
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6 col-12 d-flex align-items-center mb-4'>
                <div className='text-white'>
                    <h5>Hỗ trợ khách hàng</h5>
                    <p style={{ opacity: 0.8 }}>Gửi góp ý, khiếu nại</p>
                    <p style={{ opacity: 0.8 }}>Tuyển dụng</p>
                    <p style={{ opacity: 0.8 }}>Vận chuyển và giao nhận</p>
                    <p style={{ opacity: 0.8 }}>Hướng dẫn mua hàng</p>
                </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6 col-12 d-flex align-items-center mb-4'>
                <div className='text-white'>
                    <h5>Công ty</h5>
                    <p style={{ opacity: 0.8 }}>Giới thiệu</p>
                    <p style={{ opacity: 0.8 }}>Giải quyết khiếu nại</p>
                    <p style={{ opacity: 0.8 }}>Trung tâm Trợ giúp</p>
                    <p style={{ opacity: 0.8 }}>Hợp tác nhân viên giao nhận</p>
                </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-6 col-12 d-flex align-items-center mb-4'>
                <div className='text-white'>
                    <p><span style={{ opacity: 0.8 }}>Liên hệ: </span><span>081 825 1203</span> </p> 
                    <p><span style={{ opacity: 0.8 }}>Giới thiệu: </span><span>wukongfood@gmail.vn</span></p>
                    <p><span style={{ opacity: 0.8 }}>Địa chỉ: </span><span>Thạch Hoà, Thạch Thất, Hà Nội</span></p>
                    <p>Tìm hiểu thêm qua các nền tảng khác</p>
                    <p>
                        <a href="https://www.facebook.com/profile.php?id=61565933736328">
                            <img className='img-fluid mx-1' style={{objectFit:"cover", objectPosition:"center"}} width={30} src={face} alt="Facebook" />
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
