import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LuCopyright } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearProduct, subProduct } from '../redux/ProductReducer';
import { useEffect, useState } from "react";
import { GrSubtractCircle } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
import { RiCoupon3Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
function FormCheckout() {
    const costShip = 13.5.toFixed(3);
    const listCart = useSelector(state => state.product.products);
    const total = listCart.reduce((acc, product) => {
        return acc + (product.quantity * product.price);
    }, 0).toFixed(3);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [quantities, setQuantities] = useState([]);
    useEffect(() => {
        const lsQuantity = listCart.map(c => ({ _id: c._id, quantity: c.quantity }));
        setQuantities(lsQuantity);
    }, [listCart]);
    const handleAddProduct = (p, quantity) => {

        const exists = quantities?.find(q => q._id === p._id);
        if (exists) {
            setQuantity(exists.quantity);
        }
        // console.log(quantity);
        const aProduct = { ...p, quantity }
        dispatch(addProduct(aProduct));
    }
    const handleSubProduct = (p) => {
        const aProduct = { ...p };
        dispatch(subProduct(aProduct));
    }
    const handleChangeQuantity = (productId, newQuantity) => {
        const updatedQuantities = quantities.map(item => {
            if (item._id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setQuantities(updatedQuantities);
    }
    const totalQuantity = listCart.reduce((acc, p) => (acc + p.quantity), 0);
    return (
        <div className='row justify-content-center bg-white'>
            <div className='col-sm-9'>
                <div className='row'>
                    <div className='col-sm-12 mt-3'>
                        <p className='text-secondary fw-medium'>
                            <Link to={'/'} className='text-secondary' style={{ textDecoration: "none" }}>
                                Trang chủ
                            </Link> / <span style={{ color: "#057130" }}>Thông tin giao hàng</span>
                        </p>
                    </div>
                    <div className='col-sm-12 my-4'>
                        <h4>Thông tin giao hàng</h4>
                    </div>
                </div>
                <form>
                    <div className='row'>
                        <div className='col-sm-7'>
                            <div className="row form-group my-3 fw-medium border-bottom">
                                <p>Thông tin người nhận</p>
                            </div>
                            <div className='row my-3'>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1">Họ và tên<sup className='text-danger'>*</sup></label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputPassword1">Số điện thoại<sup className='text-danger'>*</sup></label>
                                    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="" />
                                </div>
                            </div>
                            <div className="row form-group mt-3 fw-medium">
                                <p>Hình thức nhận đơn</p>
                            </div>
                            <div className='row mb-3 mx-1'>
                                <div className="form-check col-sm-3">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Giao hàng tận nơi
                                    </label>
                                </div>
                                <div className="form-check col-sm-3">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Tự lấy hàng
                                    </label>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="form-group col-sm-6">
                                    <label htmlFor='area'>Khu vực<sup className='text-danger'>*</sup></label>
                                    <select className="form-control" id='area'>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor='district'>Phường xã<sup className='text-danger'>*</sup></label>
                                    <select className="form-control" id='district'>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group my-3">
                                    <label htmlFor='address'>Địa chỉ nhận hàng<sup className='text-danger'>*</sup></label>
                                    <input type="password" className="form-control" id="address" placeholder="" />
                                </div>
                            </div>
                            <div className="row form-group mt-3 fw-medium border-bottom">
                                <p>Hình thức vận chuyển và thanh toán</p>
                            </div>
                            <div className='row my-4'>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="pay">Hình thức thanh toán<sup className='text-danger'>*</sup></label>
                                    <select className="form-control" id='pay'>
                                        <option selected value={0}>Thanh toán khi nhận hàng</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="note">Ghi chú đơn hàng</label>
                                <textarea className="form-control" id="note" rows="3"></textarea>
                            </div>
                        </div>
                        <div className='col-sm-5'>
                            {listCart.length !== 0 && <div className='row'>
                                <div className='table col-sm-12'>
                                    <thead>
                                        <tr>
                                            <th colSpan={3} style={{ width: "60%" }}>Sản phẩm đã chọn (0)</th>
                                            <th><span><MdEdit /> Chỉnh sửa</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listCart.map((product, index) => {
                                            const quantityInCart = quantities.find(item => item._id === product._id)?.quantity;
                                            return (
                                                <tr key={product._id} style={{ marginBottom: '20px' }}>
                                                    <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} /></td>
                                                    <td style={{ width: "35%" }}><p>{product.name}</p></td>
                                                    <td className='text-center'><div>
                                                        <GrSubtractCircle style={{ cursor: "pointer" }} onClick={() => handleSubProduct(product, quantity)} color='#057130' size={20} />
                                                        <input
                                                            onChange={(e) => handleChangeQuantity(product._id, parseInt(e.target.value))}
                                                            type='number'
                                                            value={quantityInCart}
                                                            style={{ width: "40%", height: "24px" }}
                                                            className='px-1 text-center border-0 border-bottom'
                                                            onKeyDown={(e) => {
                                                                const value = e.target.value;
                                                                if (e.key === '-' || (value === '' && e.key === '0')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            onFocus={(e) => e.target.classList.add('no-outline')}
                                                            onBlur={(e) => e.target.classList.remove('no-outline')}
                                                        />
                                                        <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(product, quantityInCart)} color='#057130' size={20} />
                                                    </div></td>
                                                    <td className='text-center'><p>{(product.price * product.quantity).toFixed(3)}</p></td>
                                                </tr>
                                            );
                                        })}
                                        <tr className='table-success'>
                                            <td colSpan={2}>Phí vận chuyển</td>
                                            <td></td>
                                            <td className='text-center'>{costShip}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>Tạm tính ({totalQuantity})</td>
                                            <td></td>
                                            <td className='text-center'>{(parseFloat(total) + parseFloat(costShip)).toFixed(3)}</td>
                                        </tr>
                                    </tbody>
                                </div>
                                <div className='col-sm-12'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <p className='mx-2'>Mã khuyến mãi</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='btn btn-outline-success'><RiCoupon3Line /> Chọn mã</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12 mt-3'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <p className='mx-2'>Chiếu khấu khuyến mãi</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='d-flex justify-content-center'><span>-</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <hr />
                                </div>
                                <div className='col-sm-12 mt-3'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <h5 className='mx-2'>Thành tiền</h5>
                                        </div>
                                        <div className='col-md-4'>
                                            <h5 className='mx-2 text-center'>{(parseFloat(total) + parseFloat(costShip)).toFixed(3)} đ</h5>
                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <div className='btn btn-success btn-lg w-100 mt-2'><FaCheckCircle /> Đặt đơn</div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </form>
                <div className='row'>
                    <div className='col-sm-12 my-4 text-center text-secondary'>
                        <p><LuCopyright /> Copyright 2008 - 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormCheckout;
