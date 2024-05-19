import React, { useEffect, useState } from 'react'
import alley from '../assets/alley.png'
import { IoPricetagOutline } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, subProduct } from '../redux/ProductReducer';
import { BACK_END_HOST } from '../utils/AppConfig'
import combo1 from '../assets/combo1.png'
import toast, { Toaster } from 'react-hot-toast';
import Loading from './Loading';

function ListProduct() {

  // const [filteredProducts, setFilteredProducts] = useState([]);
  // useEffect(() => {
  //   if (searchProduct) {
  //     const filtered = listProduct.filter(p => p.name.toLowerCase().includes(searchProduct.toLowerCase()));
  //     setFilteredProducts(filtered);
  //   }
  //   else {
  //     setFilteredProducts(listProduct);
  //   }
  // }, [searchProduct]);
  // console.log(searchProduct);
  // console.log(quantity);

  const categoryId = useSelector(state => state.product.categoryId);
  const searchProduct = useSelector(state => state.product.search);
  const listCart = useSelector(state => state.product.products);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [quantities, setQuantities] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${BACK_END_HOST}/product`)
      .then(res => res.json())
      .then(data => {
        setListProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
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

  return (
    <>
      <div className='row' style={{ height: "5em" }}>
        <div className='col-sm-12' style={{ backgroundColor: "#057130" }}>
        </div>
      </div>
     
      <div className='row h-auto '>
        <div className='col-sm-12 py-5 text-center'>
          <h3 className='fw-bold'>COMBO BEAR PO</h3>
        </div>
      </div>
      <div className='row h-auto pb-4 d-flex justify-content-center'>
        <div className='col-sm-10 text-center'>
          {loading ?
            <Loading />
            :
            <div className='row w-100' >
              {listProduct.filter(p => p.isCombo && (!categoryId || p.categoryId.toString() === categoryId) && (!searchProduct || p.name.toLowerCase().includes(searchProduct.toLowerCase()))).map((p, index) => {
                const startQuantity = 1;
                const isInCart = listCart.some(c => c._id === p._id);
                const quantityInCart = quantities.find(item => item._id === p._id)?.quantity;
                return (
                  <div className="col-sm-2 mb-4" key={p._id}>
                    <div className="card w-100 mx-auto border-0">
                      {p.discount !== 0 && <p style={{ backgroundColor: "#50CD89", width: "45%", position: "absolute", top: "10px" }} className="text-light ms-2 rounded-1 text-center">Giảm giá {p.discount}%</p>}
                      <img src={p.image} style={{ width: "12em" }} className="card-img-top img-fluid mx-auto pt-1" alt="Product Image" />
                      <div className="card-body">
                        <h5 className="card-title" style={{ lineHeight: "20px", height: "40px", fontSize: "18px", overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{p.name}</h5>
                        <p className={p.discount !== 0 ? "card-text mb-0" : "card-text"} style={{ fontSize: "16px" }}>
                          <IoPricetagOutline style={{ color: "#057130" }} />
                          <span className='fw-bold' style={{ color: "#057130" }}>  {p.discount !== 0
                            ? (p.sellPrice - (p.sellPrice * (p.discount / 100))).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 3,
                            })
                            : p.sellPrice.toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 3,
                            })
                          }</span>
                          <span className='text-black-50'> VND</span>

                        </p>
                        {p.discount !== 0 ? <p className="card-text text-secondary" style={{ fontSize: "16px" }}>
                          <IoPricetagOutline />
                          <del>
                            <span className='fw-bold' > {p.sellPrice.toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 3,
                            })
                            }
                            </span>
                            <span className='text-black-50'> VND</span>
                          </del>

                        </p> : <><br /></>}
                        <div className='row d-flex justify-content-center align-items-center'>
                          <div className='col-sm-8 p-0 d-flex justify-content-center'>
                            {isInCart ? (
                              <>
                                <GrSubtractCircle style={{ cursor: "pointer" }} onClick={() => handleSubProduct(p, quantity)} color='#057130' size={24} />
                                <input
                                  onChange={(e) => handleChangeQuantity(p._id, parseInt(e.target.value))}
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
                                <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(p, quantityInCart)} color='#057130' size={24} />

                              </>
                            ) : (
                              <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(p, startQuantity)} color='#057130' size={24} />
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          }
        </div>
      </div>
      <div className='row' style={{ height: "5em" }}>
        <div className='col-sm-12' style={{ backgroundColor: "#057130" }}>
        </div>
      </div>
      <div className='row h-auto '>
        <div className='col-sm-12 py-5 text-center'>
          <h3 className='fw-bold'>ĐỒ ĂN VẶT BEAR PO</h3>
        </div>
      </div>
      <div className='row h-auto pb-5 d-flex justify-content-center'>
        <div className='col-sm-8 text-center'>
          {/* {listProduct.length === 0 && !loading? <div className='text-center display-6'>Không có sản phẩm nào</div> : */}
          {loading ?
            <Loading /> :
            (
              <>
                {listProduct.length === 0 ? (
                  <div className='text-center display-6'>Không có sản phẩm nào</div>
                ) : (
                  <div className='row'>
                    <div className='row'>
                      {listProduct.filter(p => !p.isCombo && (!categoryId || p.categoryId.toString() === categoryId) && (!searchProduct || p.name.toLowerCase().includes(searchProduct.toLowerCase()))).map(p => {
                        const startQuantity = 1;
                        const isInCart = listCart.some(c => c._id === p._id);
                        const quantityInCart = quantities.find(item => item._id === p._id)?.quantity;
                        {/* const cartItem = listCart.find(c => c._id === p._id); */ }

                        return (
                          <div className="col-sm-3 mb-4" key={p._id}>
                            <div className="card w-100 mx-auto border-0">

                              {p.discount !== 0 && <p style={{ backgroundColor: "#50CD89", width: "45%", position: "absolute", top: "10px" }} className="text-light ms-2 rounded-1 text-center">Giảm giá {p.discount}%</p>}
                              <img src={p.image} style={{ width: "12em" }} className="card-img-top img-fluid mx-auto pt-1" alt="Product Image" />
                              <div className="card-body">
                                <h5 className="card-title" style={{ lineHeight: "20px", height: "40px", fontSize: "18px", overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{p.name}</h5>
                                <p className={p.discount !== 0 ? "card-text mb-0" : "card-text"} style={{ fontSize: "16px" }}>
                                  <IoPricetagOutline style={{ color: "#057130" }} />
                                  <span className='fw-bold' style={{ color: "#057130" }}>  {p.discount !== 0
                                    ? (p.sellPrice - (p.sellPrice * (p.discount / 100))).toLocaleString('en-US', {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 3,
                                    })
                                    : p.sellPrice.toLocaleString('en-US', {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 3,
                                    })
                                  }</span>
                                  <span className='text-black-50'> VND</span>

                                </p>
                                {p.discount !== 0 ? <p className="card-text text-secondary" style={{ fontSize: "16px" }}>
                                  <IoPricetagOutline />
                                  <del>
                                    <span className='fw-bold' > {p.sellPrice.toLocaleString('en-US', {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 3,
                                    })
                                    }
                                    </span>
                                    <span className='text-black-50'> VND</span>
                                  </del>

                                </p> : <><br /></>}
                                <div className='row d-flex justify-content-center align-items-center'>
                                  <div className='col-sm-8 p-0 d-flex justify-content-center'>
                                    {isInCart ? (
                                      <>
                                        <GrSubtractCircle style={{ cursor: "pointer" }} onClick={() => handleSubProduct(p, quantity)} color='#057130' size={24} />
                                        <input
                                          onChange={(e) => handleChangeQuantity(p._id, parseInt(e.target.value))}
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
                                        <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(p, quantityInCart)} color='#057130' size={24} />

                                      </>
                                    ) : (
                                      <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(p, startQuantity)} color='#057130' size={24} />
                                    )}

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                )}
              </>
            )
          }

        </div>
      </div>

      
    </>
  )
}

export default ListProduct