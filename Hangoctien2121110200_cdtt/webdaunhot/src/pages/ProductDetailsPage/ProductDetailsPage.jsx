import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#efefef', height: '100%'}}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto'}} >
        <h5><span style={{cursor: 'pointer', fontWeight: 'bold',fontSize:16}} onClick={() => {navigate('/')}}>Trang chủ</span> - Chi tiết sản phẩm</h5>
        <ProductDetailComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage
