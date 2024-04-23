import React, { useEffect, useState } from 'react'
import image0 from '../assets/man.png'
import image1 from '../assets/chua.png'
import image2 from '../assets/ngot.png'
import image3 from '../assets/cay.png'
import image4 from '../assets/ngot.png'
import {BACK_END_HOST} from '../utils/AppConfig'
function Category() {
    const imagePaths = [image0, image1, image2, image3, image4];
    const itemStyle = {
        backgroundColor: "#057130",
    }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${BACK_END_HOST}api/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    return (
        <div className='row text-white p-2' style={{ backgroundColor: "#057130", height: "16em" }}>
            <div className='col'>
                <div className='row my-3 text-center'>
                    <div className='col-sm'>
                        <h3>DANH MỤC NỔI BẬT</h3>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm d-flex justify-content-center align-items-center'>
                        {categories.map((c, index) => (
                            <div className='text-center mx-4' style={itemStyle}>
                                <img src={imagePaths[index]} width={100} className="rounded-circle img-fluid" alt="Card image" />
                                <p className='my-2'>{c.name}</p>
                            </div>
                        ))}
                        {/* <div className='text-center mx-4' style={itemStyle}>
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
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Category