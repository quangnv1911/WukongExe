import React from 'react'
import man from '../assets/man.png'
import chua from '../assets/chua.png'
import ngot from '../assets/ngot.png'
import cay from '../assets/cay.png'
function Category() {
    const itemStyle = {
        backgroundColor: "#057130",
    }
    return (
        <div className='row text-white p-2' style={{ backgroundColor: "#057130", height:"16em" }}>
            <div className='col'>
                <div className='row my-3 text-center'>
                    <div className='col-sm'>
                        <h3>DANH MỤC NỔI BẬT</h3>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm d-flex justify-content-center align-items-center'>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={man} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <p className='my-2'>VỊ NGỌT</p>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={ngot} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <p className='my-2'>VỊ CAY</p>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={chua} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <p className='my-2'>VỊ CHUA</p>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={cay} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <p className='my-2'>VỊ MẶN</p>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={man} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <p className='my-2'>VỊ ĐẮNG</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Category