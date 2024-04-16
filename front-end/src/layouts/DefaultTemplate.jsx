import React from 'react'
import NavBar from './NavBar'

function DefaultTemplate({children}) {
  return (
    <div className='container-fluid d-flex flex-column vh-100 overflow-x-hidden bg-light'>
        <div className='row h-50'>
            <div className='col'>
                <NavBar/>
            </div>
        </div>
    </div>
  )
}

export default DefaultTemplate