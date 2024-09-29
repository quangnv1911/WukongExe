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

    const { show, handleClose, handleShow, productId, setShow } = props;

    const listCart = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [quantities, setQuantities] = useState([]);
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const lsQuantity = listCart.map(c => ({ _id: c._id, quantity: c.quantity }));
        setQuantities(lsQuantity);
    }, [listCart]);

    useEffect(() => {
        if (show && productId) {
            axios.get(`${BACK_END_HOST}/product/detail/${productId}`)
                .then(res => {
                    setProduct(res.data)
                    setIsLoading(false)
                })
                .catch(error => console.log('get product detail error:', error))
        }
    }, [show])


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

    const handleCloseModal = () => {
        setShow(false);
        // setProduct();
        // setIsLoading(true)``````````````````````````````````````````````
    }

    var quantityInCart, isInCart, startQuantity;

    useEffect(() => {
        if (product) {
            quantityInCart = quantities.find(item => item._id === product._id)?.quantity;
            isInCart = listCart.some(c => c._id === product._id);
            startQuantity = 1;
        }
    }, [product])
    

    return (
        <>
            <Modal show={show} onHide={handleCloseModal} size='xl' centered>
                <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                </Modal.Header>
                <Modal.Body closeButton>
                    <div className='row'>
                        {
                            !isLoading && product ?
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
                                                                Tình trạng: <span style={{ color: '#ffcb03', fontWeight: '600' }}>Còn hàng</span>
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

                                                            <div 
                                                                className='d-flex'
                                                                style={{
                                                                    alignItems: 'center',
                                                                    paddingBottom: '20px'
                                                                }}
                                                                >
                                                                <div style={{
                                                                    color: '#ffcb03',
                                                                    fontSize: '1.875rem',
                                                                    fontWeight: '700',
                                                                    lineHeight: '1.375',
                                                                }}>
                                                                    {product.discount !== 0
                                                                        ? (product.sellPrice - (product.sellPrice * (product.discount / 100))).toLocaleString('en-US', {
                                                                            minimumFractionDigits: 0,
                                                                            maximumFractionDigits: 3,
                                                                        })
                                                                        : product.sellPrice.toLocaleString('en-US', {
                                                                            minimumFractionDigits: 0,
                                                                            maximumFractionDigits: 3,
                                                                        })
                                                                    } (đ)
                                                                </div>
                                                                <div>
                                                                    {product.discount !== 0 ? <p className="card-text text-secondary" style={{ fontSize: "23px", paddingLeft: '20px', opacity: '0.7' }}>
                                                                        <del>
                                                                            <span className='fw-bold' > {product.sellPrice.toLocaleString('en-US', {
                                                                                minimumFractionDigits: 0,
                                                                                maximumFractionDigits: 3,
                                                                            })
                                                                            }
                                                                            </span> (đ)
                                                                        </del>

                                                                    </p> : <><br /></>}
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
                                                                <strong> Combo bao gồm:</strong>
                                                                <div>
                                                                   
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
                                                                <strong>Chuyện Kể Tây Du</strong>
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
                                                                            <GrSubtractCircle style={{ cursor: "pointer" }} onClick={() => handleSubProduct(product, quantity)} color='#ffcb03' size={24} />
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
                                                                            <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(product, quantityInCart)} color='#ffcb03' size={24} />

                                                                        </div>
                                                                    ) :
                                                                        (
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center'
                                                                            }}>
                                                                                <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(product, startQuantity)} color='#ffcb03' size={24} />
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
                                    <Wating />
                                )
                        }

                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default ModalCombo