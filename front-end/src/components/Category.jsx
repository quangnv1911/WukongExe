import React, { useEffect, useState } from 'react'
import image0 from '../assets/man.png'
import image1 from '../assets/chua.png'
import image2 from '../assets/ngot.png'
import image3 from '../assets/cay.png'
import image4 from '../assets/ngot.png'
import { BACK_END_HOST } from '../utils/AppConfig'
import { useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/ProductReducer'
function Category() {
    const imagePaths = [image0, image1, image2, image3, image4];

    const dispatch = useDispatch();
    const itemStyle = {
       
    }
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${BACK_END_HOST}/category`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setCategories(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);
    const handleSetCategory = (categoryId) => {
        dispatch(setCategoryId(categoryId));
    };
    return (
        <div className='row p-2' style={{ height: "16em" }}>
            <div className='col'>
                <div className='row my-3 text-center'>
                    <div className='col-sm'>
                        <h3>DANH MỤC NỔI BẬT</h3>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-sm d-flex justify-content-center align-items-center'>
                        {categories.map((c, index) => (
                            <div key={index} className='text-center mx-4' style={itemStyle}>
                                <img onClick={() => handleSetCategory(c._id)} src={c.image} width={100} className="rounded-circle img-fluid" alt="Card image" />
                                <p className='my-2'>{c.name}</p>
                            </div>
                        ))}
                       
                    </div>
                </div>

            </div>
        </div>
       
    )
}

export default Category