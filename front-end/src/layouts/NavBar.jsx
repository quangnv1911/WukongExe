import React, { useEffect, useReducer, useState } from 'react'
import logoCopy from '../assets/logo_copy.png';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbFilterSearch } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { Form, FormControl, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addKeySearch } from '../redux/ProductReducer';
import ShoppingCartModal from '../components/ShoppingCartModal';
import { Link } from 'react-router-dom';
function NavBar() {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const dispatch = useDispatch();
    const searchProduct = useSelector(state => state.product.search);
    const listCart = useSelector(state => state.product.products);
    const totalQuantity = listCart.reduce((acc, p) => (acc + p.quantity), 0);
    const handleSearch = (e) => {
        const { name, value } = e.target;
        if (!value.startsWith(" ")) {
            dispatch(addKeySearch(value));
        }
    };
    useEffect(() => {
        // Kiểm tra kích thước màn hình khi component được render lại
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 576); // Đặt isSmallScreen thành true nếu kích thước màn hình nhỏ hơn hoặc bằng sm
        };
        handleResize(); // Kiểm tra kích thước màn hình khi component được render lần đầu tiên
        window.addEventListener('resize', handleResize); // Thêm event listener để theo dõi thay đổi kích thước màn hình

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup để tránh memory leak
        };
    }, []);
    return (
        <div className='row d-flex justify-content-center align-items-center h-20 py-4 sticky-top bg-white navbar-wrapper'>
            <div className='col-sm-4 text-center'>
                <Link to={'/'}><img src={logoCopy} className='img-fluid ' alt="Example Image" width='250px' height='79px' /></Link>
            </div>
            <div className='col-sm-8 d-flex justify-content-end'>
                <div className='w-75 d-flex align-items-center' style={{ lineHeight: "2em" }}>
                    {/* <input type='text' placeholder='Hôm nay bạn muốn ăn gì?' className='w-50' /> */}
                    <Form className={isSmallScreen?'w-100':'w-50'} style={{ position: "relative" }} >
                        <FormControl onChange={handleSearch} type="text" placeholder="Hôm nay bạn muốn ăn gì?" className="w-100" style={{paddingRight:"2.5em"}} />
                        <CiSearch type='submit' style={{ position: "absolute", top: "15%", right: "3%", fontSize: "30px" }} />
                    </Form>
                    <span style={{ position: "relative" }}>
                        <HiOutlineShoppingBag className='mx-4' style={{ fontSize: "26px", cursor: "pointer", position: "relative" }} onClick={handleShowModal} />
                        {totalQuantity !== 0 && (
                            <sup style={{ position: "absolute", top: "-5px", left: "42px", backgroundColor: "red", color: "white", borderRadius: "50%", padding: "10px 8px", fontSize: "12px" }}>{totalQuantity}</sup>
                        )}
                    </span>
                    {/* {!isSmallScreen && (
                        <button className='text-white btn' style={{ backgroundColor: "#ffcb03" }}>
                            <TbFilterSearch style={{ fontSize: "20px", lineHeight: "2em" }} />
                            <span className='ml-1'>Bộ lọc</span>
                        </button>
                    )} */}
                </div>
            </div>
            <ShoppingCartModal show={showModal} handleClose={handleCloseModal} />
        </div>
    )
}

export default NavBar