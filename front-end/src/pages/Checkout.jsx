import React from 'react'
import DefaultTemplate from '../layouts/DefaultTemplate'
import Story from '../components/Story'
import Category from '../components/Category'
import ListProduct from '../components/ListProduct'
import Combo from '../components/Combo'
import Voucher from '../components/Voucher'
import FormCheckout from '../components/FormCheckout'
function Checkout() {
  return (
    <DefaultTemplate>
        <FormCheckout/>
    </DefaultTemplate>
  )
}

export default Checkout