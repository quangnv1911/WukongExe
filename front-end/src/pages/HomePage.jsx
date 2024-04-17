import React from 'react'
import DefaultTemplate from '../layouts/DefaultTemplate'
import Story from '../components/Story'
import Category from '../components/Category'
import ListProduct from '../components/ListProduct'
const HomePage = () => {
  return (
    <DefaultTemplate>
      <Story />
      <Category />
      <ListProduct/>
    </DefaultTemplate>
  )
}

export default HomePage