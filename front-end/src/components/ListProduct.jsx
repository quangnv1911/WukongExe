import React, { useEffect, useState } from 'react'
import alley from '../assets/alley.png'
import { IoPricetagOutline } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { GrAddCircle } from "react-icons/gr";
{/* <GrSubtractCircle /> */ }
{/* <IoAddCircleOutline /> */ }
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/ProductReducer';
function ListProduct() {
  const listProduct = [
    {
      _id: 0,
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
      category: 0
    },
    {
      _id: 1,
      image: alley,
      name: "Bingsu alley 3 vị",
      price: "19.99",
      category: 1
    },
    {
      _id: 2,
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
      category: 0
    },
    {
      _id: 3,
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
      category: 1
    },
    {
      _id: 4,
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
      category: 1
    },
    {
      _id: 5,
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
      category: 0
    }
  ];
  const searchProduct = useSelector(state => state.product.search);
  const listCart = useSelector(state => state.product.products);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const handleAddProduct = (p, quantity) => {
    const aProduct = { ...p, quantity };
    dispatch(addProduct(aProduct));
  }
  console.log(listCart);
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
console.log(quantity);
  return (
    <>
      <div className='row h-auto '>
        <div className='col-sm-12 py-5 text-center'>
          <h3 className='fw-bold'>ĐỒ ĂN VẶT BEAR PO</h3>
        </div>
      </div>
      <div className='row h-auto pb-5 d-flex justify-content-center'>
        <div className='col-sm-8'>
          {listProduct.length === 0 ? <div className='text-center display-6'>Không có sản phẩm nào</div> :
            <div className='row'>
              {listProduct.map(p => {
                const isInCart = listCart.some(c => c._id === p._id);
                const cartItem = listCart.find(c => c._id === p._id);
                {/* if(isInCart){
                  setQuantity(cartItem.quantity);
                } */}
                return (
                  <div className="col-sm-3 mb-4" key={p._id}>
                    <div className="card w-100 mx-auto border-0">
                      <img src={p.image} style={{ width: "12em" }} className="card-img-top img-fluid mx-auto pt-1" alt="Product Image" />
                      <div className="card-body">
                        <h5 className="card-title" style={{ lineHeight: "20px", height: "40px", fontSize: "18px", overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{p.name}</h5>
                        <p className="card-text" style={{ fontSize: "16px" }}>
                          <IoPricetagOutline style={{ color: "#057130" }} />
                          <span className='fw-bold' style={{ color: "#057130" }}> {p.price}</span>
                          <span className='text-black-50'> VND</span>
                        </p>
                        <div className='row d-flex justify-content-center align-items-center'>
                          <div className='col-sm-8 p-0 d-flex justify-content-center'>
                          {isInCart ? (
                            <>
                              <GrSubtractCircle color='#057130' size={24} />
                              <input
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                type='number'
                                value={cartItem.quantity}
                                // value={3}
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
                              <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(p, quantity)} color='#057130' size={24} />
                            </>
                          ) : (
                            <GrAddCircle style={{ cursor: "pointer" }} onClick={() => handleAddProduct(p, quantity)} color='#057130' size={24} />
                          )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>}
        </div>
      </div>
    </>
  )
}

export default ListProduct