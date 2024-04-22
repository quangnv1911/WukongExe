import React from 'react'
import logo from '../assets/logo.png'
import face from '../assets/face.png'
import inta from '../assets/inta.png'
import tiktok from '../assets/tiktok.png'
import zalo from '../assets/zalo.png'
import tele from '../assets/tele.png'
function Footer() {
    return (
        <div className='row d-flex p-4' style={{ height: "20em", backgroundColor: "#057130"}}>
            <div className='col-sm-3 text-center'>
                <img src={logo} width={240} className='img-fuild' />
            </div>
            <div className='col-sm-3 d-flex justify-content-center align-items-center'>
                <div className='w-75 h-75 text-white'>
                    <h5>Hỗ trợ khách hàng</h5>
                    <p style={{ opacity: 0.8 }}>Gửi góp ý, khiếu nại</p>
                    <p style={{ opacity: 0.8 }}>Tuyển dụng</p>
                    <p style={{ opacity: 0.8 }}>Vận chuyển và giao nhận</p>
                    <p style={{ opacity: 0.8 }}>Hướng dẫn mua hàng</p>
                </div>
            </div>
            <div className='col-sm-3 d-flex justify-content-center align-items-center'>
                <div className='w-75 h-75 text-white'>
                    <h5>Công ty</h5>
                    <p style={{ opacity: 0.8 }}>Giới thiệu</p>
                    <p style={{ opacity: 0.8 }}>Giải quyết khiếu nại</p>
                    <p style={{ opacity: 0.8 }}>Trung tâm Trợ giúp</p>
                    <p style={{ opacity: 0.8 }}>Hợp tác nhân viên giao nhận</p>
                </div>
            </div>
            <div className='col-sm-3 d-flex justify-content-center align-items-center'>
                <div className=' h-75 text-white' style={{width:"80%"}}>
                    <p><span style={{ opacity: 0.8 }}>Liên hệ: </span><span>+84 358627705</span> </p> 
                    <p><span style={{ opacity: 0.8 }}>Giới thiệu: </span><span>bearpofood@gmail.vn</span></p>
                    <p><span style={{ opacity: 0.8 }}>Địa chỉ: </span><span>Thạch Hoà, Thạch Thất, Hà Nội</span></p>
                    <p>Tìm hiểu thêm qua các nền tảng khác</p>
                    <p><img className='img-fluid' width={30} src={face}/><span> </span><img width={30} className='img-fluid' src={zalo}/><span> </span><img width={30} className='img-fluid' src={tele}/><span> </span><img width={30} className='img-fluid' src={inta}/><span> </span><img width={30} className='img-fluid' src={tiktok}/></p>
                </div>
            </div>
        </div>
    )
}

export default Footer