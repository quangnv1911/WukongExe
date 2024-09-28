import { Modal, Button, ModalHeader } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { GrSubtractCircle } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearProduct, subProduct } from '../redux/ProductReducer';
import emptyCart from '../assets/emptycart.png'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
function ShoppingCartModal({ show, handleClose }) {
    const listCart = useSelector(state => state.product.products);
    const total = listCart.reduce((acc, product) => {
        return acc + (product.quantity * product.sellPrice - (product.sellPrice * (product.discount / 100)));
    }, 0).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    });
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
        toast.success('Đã thêm sản phẩm vào giỏ hàng!', {
            style: {
                color: '#fbbf24' // Màu vàng (Tailwind CSS: yellow-400)
            },
        });
    }
    const handleSubProduct = (p) => {
        const aProduct = { ...p };
        dispatch(subProduct(aProduct));
        toast.success('Đã xoá sản phẩm khỏi giỏ hàng!', {
            style: {
                color: '#fbbf24' // Màu vàng (Tailwind CSS: yellow-400)
            },
        });
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
    const handleDeleteCart = () => {
        dispatch(clearProduct());
        toast.success('Đã xoá tất cả sản phẩm khỏi giỏ hàng!');
    }
    return (
        <Modal className='mt-5' show={show} onHide={handleClose}>
            <ModalHeader closeButton><h5>Giỏ hàng</h5></ModalHeader>
            <Modal.Body style={{ maxHeight: "400px", overflowX: "hidden" }}>
                {(listCart.length === 0) ?
                    <div style={{ maxWidth: "500px" }} className='text-center'>
                        <img src={emptyCart} className='img-fuild' style={{ width: "100%" }} />
                        <p>Hiện không có sản phẩm nào trong giỏ hàng</p>
                    </div> : <>
                        <div className="table text-center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th></th>
                                    <th style={{ width: "35%" }}>Tên sản phẩm</th>
                                    <th style={{ width: "25%" }}>Số lượng</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>

                                {listCart.map((product, index) => {
                                    const quantityInCart = quantities.find(item => item._id === product._id)?.quantity;
                                    return (
                                        <tr key={product._id} style={{ marginBottom: '20px' }}>
                                            <td>{index + 1}</td>
                                            <td><img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', marginRight: '10px' }} /></td>
                                            <td><p>{product.name}</p></td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <GrSubtractCircle style={{ cursor: "pointer" }} onClick={() => handleSubProduct(product, quantity)} color='#ffcb03' size={24} />
                                                    <input
                                                        onChange={(e) => handleChangeQuantity(product._id, parseInt(e.target.value))}
                                                        type='number'
                                                        value={quantityInCart}
                                                        style={{ width: "40%", height: "24px" }}
                                                        className='px-0 text-center border-0 border-bottom'
                                                        onKeyDown={(e) => {
                                                            const value = e.target.value;
                                                            if (e.key === '-' || (value === '' && e.key === '0')) {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        onFocus={(e) => e.target.classList.add('no-outline')}
                                                        onBlur={(e) => e.target.classList.remove('no-outline')}
                                                    />
                                                    <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(product, quantityInCart)} color='#ffcb03' size={24} />
                                                </div>
                                            </td>
                                            <td><p>{(product.sellPrice - (product.sellPrice * (product.discount / 100))).toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 3,
                                            })}</p></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <Button variant='danger' onClick={handleDeleteCart}>Xoá giỏ hàng</Button>
                        </div>
                    </>}
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'space-between' }}>
                {listCart.length === 0 ?
                    <div style={{ marginLeft: 'auto' }}>
                        <Link to={'/'} className='btn btn-warning' onClick={handleClose}>Trở lại</Link>
                    </div> :
                    <>
                        <h5 style={{ textAlign: 'left' }}>Tổng tiền: {total} VNĐ</h5>
                        <Link to="/checkout" className="btn btn-warning">Đặt đơn</Link>
                    </>
                }
            </Modal.Footer>



        </Modal>
    );
}
export default ShoppingCartModal;
