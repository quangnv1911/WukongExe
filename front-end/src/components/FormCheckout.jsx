import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LuCopyright } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearProduct, subProduct } from '../redux/ProductReducer';
import { useEffect, useState } from "react";
import { GrSubtractCircle } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
import { RiCoupon3Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { ADDRESS_HOST, BACK_END_HOST } from '../utils/AppConfig';
import Modal from 'react-bootstrap/Modal';
import toast, { Toaster } from 'react-hot-toast';
import QrModal from './QrModal';
import { v4 as uuidv4 } from 'uuid';

function FormCheckout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [quantities, setQuantities] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [communesCopy, setCommunesCopy] = useState([]);
    const [listVoucher, setListVoucher] = useState([]);
    const [idProvince, setIdProvince] = useState("");
    const [idDistrict, setIdDistrict] = useState("");
    const [idCommune, setIdCommune] = useState("");
    const [idVoucher, setIdVoucher] = useState(null);
    const [percentVoucher, setPercentVoucher] = useState(0);
    const [endPointAddress, setEndPointAddress] = useState('');
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    useEffect(() => {
        const provinceName = provinces.find(p => p.idProvince === idProvince)?.name || '';

        const districtName = districts.find(d => d.idDistrict === idDistrict)?.name || '';

        const communeName = communes.find(c => c.idCommune === idCommune)?.name || '';

        setEndPointAddress(`, ${communeName}, ${districtName}, ${provinceName}`);
    }, [idCommune]);

    const [selectedValue, setSelectedValue] = useState('1');
    const costShip = 13.5.toFixed(3);
    const listCart = useSelector(state => state.product.products);
    const totalQuantity = listCart.reduce((acc, p) => (acc + p.quantity), 0);
    const total = listCart.reduce((acc, product) => {
        return acc + (product.quantity * (product.sellPrice - (product.sellPrice * (product.discount / 100))))
    }, 0).toFixed(3);
    const totalP = listCart.reduce((acc, product) => {
        return acc + (product.quantity * (product.importPrice));
    }, 0).toFixed(3);
    const discountTotal = total * (percentVoucher / 100);
    const totalEnd = total - discountTotal;
    const totalProf = totalEnd - totalP;

    const [postData, setPostData] = useState({
        customerName: '',
        customerPhone: '',
        customerAddress: 'Tự lấy',
        receiverName: '',
        receiverPhone: '',
        totalProfit: totalProf,
        total: totalEnd,
        status: false,
        voucher: idVoucher,
        note: '',
        listCart: [listCart]
    });

    useEffect(() => {
        setPostData({ ...postData, voucher: idVoucher, total: totalEnd, listCart: listCart });
        console.log(postData);
        console.log("hello");
    }, [idVoucher, listCart]);

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        if (name == "customerAddress") {
            setPostData({ ...postData, [name]: value.concat(endPointAddress) });
        } else {
            setPostData({ ...postData, [name]: value });
        }
        console.log(postData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleShow();
        // console.log(postData);
        // fetch(`${BACK_END_HOST}/order`, {
        //     method: "POST",
        //     headers: { "Content-Type": "Application/JSON" },
        //     body: JSON.stringify(postData)
        // })
        // toast.success("Đặt hàng thành công!");
        // dispatch(clearProduct());
        // navigate("/");
    };


    const handleApplyVoucher = (v) => {
        setIdVoucher(v._id);
        setPercentVoucher(v.percent);
        handleCloseModal();
    };
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const filterCommunesByDistrict = (idDis) => {
        const arrCommune = communes.filter(commune => commune.idDistrict === idDis);
        setCommunesCopy(arrCommune);
    }
    useEffect(() => {
        filterCommunesByDistrict(idDistrict);
    }, [idDistrict]);
    const handleClickArea = (e) => {
        const idDis = e.target.value;
        const arr = idDis.split(" ");
        setIdDistrict(arr[0]);
        setIdProvince(arr[1]);
    };
    const handleClickCommune = (e) => {
        const idCom = e.target.value;
        setIdCommune(idCom);
    }


    useEffect(() => {
        fetch(`${ADDRESS_HOST}province`)
            .then(res => res.json())
            .then(data => setProvinces(data))
            .catch(err => console.log(err.message));
    }, []);
    useEffect(() => {
        fetch(`${ADDRESS_HOST}district`)
            .then(res => res.json())
            .then(data => setDistricts(data))
            .catch(err => console.log(err.message));
    }, []);
    useEffect(() => {
        fetch(`${ADDRESS_HOST}commune`)
            .then(res => res.json())
            .then(data => setCommunes(data))
            .catch(err => console.log(err.message));
    }, []);
    useEffect(() => {
        fetch(`${BACK_END_HOST}/voucher`)
            .then(res => res.json())
            .then(data => setListVoucher(data))
            .catch(err => {
                console.log(err.message);
            });
    }, []);

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


    const handleChangeRadio = (event) => {
        setSelectedValue(event.target.value);
    };
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };
    return (
        <div className='row justify-content-center bg-white'>

            <Modal show={showModal} onHide={handleCloseModal} size='lg' centered={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Chọn mã khuyến mãi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Table hiển thị thông tin mã khuyến mãi */}
                    <table className="table">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">Mã</th>
                                <th scope="col">Mô tả</th>
                                <th scope="col">Ngày hết hạn</th>
                                <th scope="col">Phần trăm</th>
                                <th scope="col">Áp dụng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listVoucher.map((v, index) => (
                                <tr className='text-center' key={index}>
                                    <td >{v.code}</td>
                                    <td>{v.name}</td>
                                    <td>{formatDate(v.expiryDate)}</td>
                                    <td >{v.percent}%</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleApplyVoucher(v)}>Áp dụng</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>

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
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-sm-7'>
                            <div className="row form-group my-3 fw-medium border-bottom">
                                <p>Thông tin người nhận</p>
                            </div>
                            <div className='row my-3'>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputEmail1">Họ và tên<sup className='text-danger'>*</sup></label>
                                    <input onChange={handleChangeData} required name='customerName' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                                </div>
                                <div className="form-group col-sm-6">
                                    <label htmlFor="exampleInputPassword1">Số điện thoại<sup className='text-danger'>*</sup></label>
                                    <input onChange={handleChangeData} required name='customerPhone' type="number" className="form-control" id="exampleInputPassword1" placeholder="" />
                                </div>
                            </div>
                            <div className="row form-group mt-3 fw-medium">
                                <p>Hình thức nhận đơn</p>
                            </div>
                            <div className='row mb-3 mx-1'>
                                <div className="form-check col-sm-3">
                                    <input className="form-check-input" type="radio" name="exampleRadio" id="exampleRadios0" value="1" onChange={handleChangeRadio} checked={selectedValue === '1'} />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Giao hàng tận nơi
                                    </label>
                                </div>
                                <div className="form-check col-sm-3">
                                    <input className="form-check-input" type="radio" name="exampleRadio" id="exampleRadios1" onChange={handleChangeRadio} checked={selectedValue === '2'} value="2" />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Giao hàng bí mật
                                    </label>
                                </div>
                                <div className="form-check col-sm-3">
                                    <input className="form-check-input" type="radio" name="exampleRadio" id="exampleRadios2" onChange={handleChangeRadio} checked={selectedValue === '3'} value="3" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Tự lấy hàng
                                    </label>
                                </div>
                            </div>
                            {selectedValue === '2' && (
                                <div className='row my-3'>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="exampleInputEmail1">Họ và tên người nhận<sup className='text-danger'>*</sup></label>
                                        <input onChange={handleChangeData} required name='receiverName' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label htmlFor="exampleInputPassword1">Số điện thoại người nhận<sup className='text-danger'>*</sup></label>
                                        <input onChange={handleChangeData} required name='receiverPhone' type="receiverPhone" className="form-control" id="exampleInputPassword1" placeholder="" />
                                    </div>
                                </div>
                            )}
                            {selectedValue === '3' ? <></> :
                                <>
                                    <div className='row my-3'>
                                        <div className="form-group col-sm-6">
                                            <label htmlFor='area'>Khu vực<sup className='text-danger'>*</sup></label>
                                            <select className="form-control" id='area' onChange={handleClickArea} >
                                                <option>Chọn khu vực</option>
                                                {provinces.map(p => {
                                                    return districts.filter(d => d.idProvince === p.idProvince).map(d => (
                                                        <option key={d.idDistrict} value={d.idDistrict + " " + p.idProvince}>{p.name} - {d.name}</option>
                                                    ));
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <label htmlFor='district'>Phường xã<sup className='text-danger'>*</sup></label>
                                            <select className="form-control" id='district' onChange={handleClickCommune} >
                                                <option>Chọn phường xã</option>
                                                {communesCopy.map((c, index) => (<option key={index} value={c.idCommune}>{c.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="form-group my-2">
                                            <label htmlFor='address'>Địa chỉ nhận hàng<sup className='text-danger'>*</sup></label>
                                            <input onChange={handleChangeData} required name='customerAddress' type="text" className="form-control" id="address" placeholder="" />
                                        </div>
                                    </div>
                                </>
                            }




                            <div className="form-group">
                                <label htmlFor="notex">Ghi chú đơn hàng</label>
                                <textarea onChange={handleChangeData} name='note' className="form-control" id="notex" rows="3"></textarea>
                            </div>

                            {/* <div className="row form-group mt-3 fw-medium border-bottom">
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
                            </div> */}
                        </div>
                        <div className='col-sm-5'>
                            {listCart.length !== 0 && <div className='row'>
                                <div className='table col-sm-12'>
                                    <thead>
                                        <tr>
                                            <th colSpan={3} style={{ width: "60%" }}>Sản phẩm đã chọn ({totalQuantity})</th>
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
                                                    <td className='text-center'><p>{((product.sellPrice - (product.sellPrice * (product.discount / 100))) * product.quantity).toLocaleString('en-US', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 3,
                                                    })}</p></td>
                                                </tr>
                                            );
                                        })}
                                        {/* <tr className='table-success'>
                                            <td colSpan={2}>Phí vận chuyển</td>
                                            <td></td>
                                            <td className='text-center'>{costShip}</td>
                                        </tr> */}
                                        <tr className='table-success'>
                                            <td colSpan={2}>Tạm tính ({totalQuantity})</td>
                                            <td></td>
                                            <td className='text-center'>{parseFloat(total).toLocaleString("en-US", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3
                                            })}</td>
                                        </tr>
                                    </tbody>
                                </div>
                                <div className='col-sm-12'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <p className='mx-2'>Mã khuyến mãi</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='btn btn-outline-success' onClick={handleOpenModal}><RiCoupon3Line /> Chọn mã</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-12 mt-3'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <p className='mx-2'>Chiếu khấu khuyến mãi</p>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='d-flex justify-content-center'><span>-{discountTotal.toLocaleString("en-US", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3
                                            })}</span></div>
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
                                            <h5 className='mx-2 text-center'>{parseFloat(totalEnd).toLocaleString("en-US", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3
                                            })} đ</h5>
                                        </div>
                                    </div>
                                    <div className='col-sm-12'>
                                        <button className='btn btn-success btn-lg w-100 mt-2' type="submit"><FaCheckCircle /> Đặt đơn</button>
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
                <QrModal
                    show={show}
                    setShow={setShow}
                    total={totalEnd}
                    uuid={uuidv4()}
                    postData={postData}
                />
            </div>
        </div>
    );
}

export default FormCheckout;
