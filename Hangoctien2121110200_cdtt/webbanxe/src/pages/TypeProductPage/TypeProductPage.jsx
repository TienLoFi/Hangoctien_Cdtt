import React from 'react'
import {Col,Pagination,Row } from 'antd'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavComponent from '../../components/NavComponent/NavComponent'
import { WrapperNavbar, WrapperProducts } from './style'

const TypeProductPage = () => {
    const onChange =()=>{}
  return (
    <Row style={{ padding: '0 120px', background: '#efefef', flexWrap: 'nowrap',paddingTop:'10px'}}>
                          
                          <WrapperNavbar span={4}
                        >
    <NavComponent />
</WrapperNavbar>
    <Col span={ 20}>
    <WrapperProducts>

        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        </WrapperProducts>
        <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px'}}/>

    </Col>  
</Row>

  )
}

export default TypeProductPage
