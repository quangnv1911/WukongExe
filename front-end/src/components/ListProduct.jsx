import React from 'react'
import alley from '../assets/alley.png'
import { IoPricetagOutline } from "react-icons/io5";
function ListProduct() {
  return (
    <>
      <div className='row h-auto '>
        <div className='col-sm-12 py-5 text-center'>
          <h3>ĐỒ ĂN VẶT BEAR PO</h3>
        </div>
      </div>
      <div className='row h-auto pb-5 d-flex justify-content-center'>
        <div className='col-sm-8'>
          <div className='row'>
            <div className="col-sm-3 mb-4">
              <div className="card w-100 mx-auto border-0">
                <img src={alley} style={{ width: "12em" }} className="card-img-top mx-auto pt-1" alt="Product Image" />
                <div className="card-body">
                  <h5 className="card-title">Trà sữa alley 3 vị</h5>
                  {/* <p className="card-text">Product Description 1</p> */}
                  <br />
                  <p className="card-text"><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> 19.99</span><span className='text-black-50'> VND</span></p>
                  <a href="#" className="btn btn-success">Add to Cart</a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <div className="card w-100 mx-auto border-0">
                <img src={alley} style={{ width: "12em" }} className="card-img-top mx-auto pt-1" alt="Product Image" />
                <div className="card-body">
                  <h5 className="card-title">Trà sữa alley 3 vị</h5>
                  {/* <p className="card-text">Product Description 1</p> */}
                  <br />
                  <p className="card-text"><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> 19.99</span><span className='text-black-50'> VND</span></p>
                  <a href="#" className="btn btn-success">Add to Cart</a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <div className="card w-100 mx-auto border-0">
                <img src={alley} style={{ width: "12em" }} className="card-img-top mx-auto pt-1" alt="Product Image" />
                <div className="card-body">
                  <h5 className="card-title">Trà sữa alley 3 vị</h5>
                  {/* <p className="card-text">Product Description 1</p> */}
                  <br />
                  <p className="card-text"><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> 19.99</span><span className='text-black-50'> VND</span></p>
                  <a href="#" className="btn btn-success">Add to Cart</a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <div className="card w-100 mx-auto border-0">
                <img src={alley} style={{ width: "12em" }} className="card-img-top mx-auto pt-1" alt="Product Image" />
                <div className="card-body">
                  <h5 className="card-title">Trà sữa alley 3 vị</h5>
                  {/* <p className="card-text">Product Description 1</p> */}
                  <br />
                  <p className="card-text"><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> 19.99</span><span className='text-black-50'> VND</span></p>
                  <a href="#" className="btn btn-success">Add to Cart</a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <div className="card w-100 mx-auto border-0">
                <img src={alley} style={{ width: "12em" }} className="card-img-top mx-auto pt-1" alt="Product Image" />
                <div className="card-body">
                  <h5 className="card-title">Trà sữa alley 3 vị</h5>
                  {/* <p className="card-text">Product Description 1</p> */}
                  <br />
                  <p className="card-text"><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> 19.99</span><span className='text-black-50'> VND</span></p>
                  <a href="#" className="btn btn-success">Add to Cart</a>
                </div>
              </div>
            </div>
            <div className="col-sm-3 mb-4">
              <div className="card w-100 mx-auto border-0">
                <img src={alley} style={{ width: "12em" }} className="card-img-top mx-auto pt-1" alt="Product Image" />
                <div className="card-body">
                  <h5 className="card-title">Trà sữa alley 3 vị</h5>
                  {/* <p className="card-text">Product Description 1</p> */}
                  <br />
                  <p className="card-text"><IoPricetagOutline style={{ color: "#057130" }} /><span className='fw-bold' style={{ color: "#057130" }}> 19.99</span><span className='text-black-50'> VND</span></p>
                  <a href="#" className="btn btn-success">Add to Cart</a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default ListProduct