import React, { useEffect, useState } from 'react'
import alley from '../assets/alley.png'
import { IoPricetagOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
function ListProduct() {
  const searchProduct = useSelector(state => state.product.search);
  const listProduct = [
    {
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
    },
    {
      image: alley,
      name: "Bingsu alley 3 vị",
      price: "19.99",
    },
    {
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
    },
    {
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
    },
    {
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
    },
    {
      image: alley,
      name: "Trà sữa alley 3 vị",
      price: "19.99",
    }
  ];
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if (searchProduct) {
      const filtered = listProduct.filter(p => p.name.toLowerCase().includes(searchProduct.toLowerCase()));
      setFilteredProducts(filtered);
    }
    else {
      setFilteredProducts(listProduct);
    }
  }, [searchProduct]);
  console.log(searchProduct);
  return (
    <>
      <div className='row h-auto '>
        <div className='col-sm-12 py-5 text-center'>
          <h3 className='fw-bold'>ĐỒ ĂN VẶT BEAR PO</h3>
        </div>
      </div>
      <div className='row h-auto pb-5 d-flex justify-content-center'>
        <div className='col-sm-8'>
          {filteredProducts.length===0?<div className='text-center display-6'>Không có sản phẩm nào</div>:<div className='row'>
            {filteredProducts.map(p => {
              return (
                <div className="col-sm-3 mb-4">
                  <div className="card w-100 mx-auto border-0">
                    <img src={p.image} style={{ width: "12em" }} className="card-img-top img-fluid mx-auto pt-1" alt="Product Image" />
                    <div className="card-body">
                      <h5 className="card-title" style={{ lineHeight: "20px", height: "40px", fontSize: "18px", overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{p.name}</h5>
                      {/* <br /> */}
                      <p className="card-text" style={{ fontSize: "16px" }}><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> {p.price}</span><span className='text-black-50'> VND</span></p>
                      <a href="#" className="btn btn-success">Add to Cart</a>
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