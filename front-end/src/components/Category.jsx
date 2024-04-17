import React from 'react'
import man from '../assets/man.png'
function Category() {
    const itemStyle = {
        backgroundColor: "#057130",
    }
    return (
        <div className='row h-25 text-white p-2' style={{ backgroundColor: "#057130" }}>
            <div className='col'>
                <div className='row my-3 text-center'>
                    <div className='col-sm'>
                        <h3>DANH MỤC NỔI BẬT</h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm d-flex justify-content-center align-items-center'>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={man} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <h5 className='my-2'>Title</h5>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={man} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <h5 className='my-2'>Title</h5>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={man} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <h5 className='my-2'>Title</h5>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={man} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <h5 className='my-2'>Title</h5>
                        </div>
                        <div className='text-center mx-4' style={itemStyle}>
                            <img src={man} width={100} className="rounded-circle img-fluid" alt="Card image" />
                            <h5 className='my-2'>Title</h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Category