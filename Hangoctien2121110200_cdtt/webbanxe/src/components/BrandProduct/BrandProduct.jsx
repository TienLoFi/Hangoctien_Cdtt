import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperType } from './style'

const BrandProduct = ({ name }) => {
  const navigate = useNavigate()
  const handleNavigatebrand = (brand) => {
    navigate(`/product/${brand.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: brand})
  }
  return (
    <WrapperType onClick={() => handleNavigatebrand(name)}>{name}</WrapperType>
   
  )
}

export default BrandProduct