import React from 'react'
import DefaultTemplate from '../layouts/DefaultTemplate'
import Story from '../components/Story'
import Category from '../components/Category'
const HomePage = () => {
  return (
    <DefaultTemplate>
      <Story />
      <Category />
    </DefaultTemplate>
  )
}

export default HomePage