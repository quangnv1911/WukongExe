import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'


function DefaultTemplate({children}) {
  return (
    <div className='container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-light'>
        <div className='row h-50'>
            <div className='col'>
                <NavBar/>
                {children}
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default DefaultTemplate