import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, subProduct } from '../redux/ProductReducer';
import axios from 'axios'
import { BACK_END_HOST } from '../utils/AppConfig';
import toast from 'react-hot-toast';
import Wating from '../utils/Wating';

const ModalCombo = (props) => {

    const { show, handleClose, handleShow, productId } = props;

    const listCart = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [quantities, setQuantities] = useState([]);
    const [product, setProduct] = useState();

    useEffect(() => {
        const lsQuantity = listCart.map(c => ({ _id: c._id, quantity: c.quantity }));
        setQuantities(lsQuantity);
    }, [listCart]);

    useEffect(() => {
        if (productId) {
            axios.get(`${BACK_END_HOST}/product/detail/${productId}`)
                .then(res => {
                    console.log('ress', res.data);
                    setProduct(res.data)
                })
                .catch(error => console.log('get product detail error:', error))
        }
    }, [productId])


    const handleAddProduct = (p, quantity) => {
        const exists = quantities?.find(q => q._id === p._id);
        if (exists) {
            setQuantity(exists.quantity);
        }
        const aProduct = { ...p, quantity }
        dispatch(addProduct(aProduct));
        toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    }
    const handleSubProduct = (p) => {
        const aProduct = { ...p };
        dispatch(subProduct(aProduct));
        toast.success('Đã xoá sản phẩm khỏi giỏ hàng!');
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
    var quantityInCart, isInCart, startQuantity;

    if (product) {
        quantityInCart = quantities.find(item => item._id === product._id)?.quantity;
        isInCart = listCart.some(c => c._id === product._id);
        startQuantity = 1;
    }

    return (
        <>

            <Modal show={show} onHide={handleClose} size='xl' centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body closeButton>
                    <div className='row'>
                        {
                            product ?
                                (
                                    <>
                                        <div className='col-md-6 col-sm-12'
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    borderRadius: '5px',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <img src={product ? product.image : ''} alt='Combo' width={'100%'} />
                                            </div>
                                        </div>
                                        <div className='col-md-6 col-sm-12'>
                                            {
                                                productId && product ?
                                                    (
                                                        <div className='m-2'>
                                                            <h4>{product ? product.name : ''}</h4>
                                                            <div>
                                                                Tình trạng: <span style={{ color: 'green', fontWeight: '600' }}>Còn hàng</span>
                                                            </div>
                                                            <div className='d-flex' style={{ justifyContent: 'center', marginBottom: '20px' }}>
                                                                <div
                                                                    style={{
                                                                        borderBottom: '1px solid grey',
                                                                        opacity: 0.3,
                                                                        width: '95%'
                                                                    }}
                                                                />
                                                            </div>

                                                            <div style={{
                                                                color: 'green',
                                                                fontSize: '1.875rem',
                                                                fontWeight: '700',
                                                                lineHeight: '1.375',
                                                                paddingBottom: '20px'
                                                            }}>
                                                                {product.sellPrice.toLocaleString('vi-VN')} (đ)
                                                            </div>

                                                            <div className='d-flex' style={{ justifyContent: 'center', marginBottom: '20px' }}>
                                                                <div
                                                                    style={{
                                                                        borderBottom: '1px solid grey',
                                                                        opacity: 0.3,
                                                                        width: '95%'
                                                                    }}
                                                                />
                                                            </div>

                                                            <div>
                                                                <strong>Mô tả sản phẩm</strong>
                                                                <div>
                                                                    Sản phẩm bao gồm:
                                                                    {
                                                                        product ? <div dangerouslySetInnerHTML={{ __html: product.subdescription }}></div> : ''
                                                                    }

                                                                </div>
                                                            </div>

                                                            <div className='d-flex' style={{ justifyContent: 'center', marginBottom: '20px' }}>
                                                                <div
                                                                    style={{
                                                                        borderBottom: '1px solid grey',
                                                                        opacity: 0.3,
                                                                        width: '95%'
                                                                    }}
                                                                />
                                                            </div>

                                                            <div>
                                                                <strong>Câu truyện về chú gấu</strong>
                                                                <div>
                                                                    {
                                                                        product ? <div dangerouslySetInnerHTML={{ __html: product.story }}></div> : ''
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div style={{
                                                                padding: '20px 0',

                                                            }}>
                                                                {
                                                                    isInCart ? (
                                                                        <div style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center'
                                                                        }}>
                                                                            <GrSubtractCircle style={{ cursor: "pointer" }} onClick={() => handleSubProduct(product, quantity)} color='#057130' size={24} />
                                                                            <input
                                                                                onChange={(e) => handleChangeQuantity(product._id, parseInt(e.target.value))}
                                                                                type='number'
                                                                                value={quantityInCart}
                                                                                style={{ width: "40%" }}
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
                                                                            <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(product, quantityInCart)} color='#057130' size={24} />

                                                                        </div>
                                                                    ) :
                                                                        (
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center'
                                                                            }}>
                                                                                <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(product, startQuantity)} color='#057130' size={24} />
                                                                            </div>
                                                                        )
                                                                }

                                                            </div>

                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <></>
                                                    )


                                            }

                                        </div>
                                    </>
                                )
                                :
                                (
                                    <Wating/>
                                )
                        }

                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalCombo