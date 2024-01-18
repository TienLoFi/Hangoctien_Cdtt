import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined ,MailOutlined,StarOutlined} from '@ant-design/icons'


import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/Backend/AdminUser/AdminUser';
import AdminProduct from '../../components/Backend/AdminProduct/AdminProduct';
// import OrderAdmin from '../../components/Backend/OrderAdmin/OrderAdmin';
import AdminBrand from '../../components/Backend/AdminBrand/AdminBrand';
import AdminMenu from '../../components/Backend/AdminMenu/AdminMenu';
import AdminSlider from '../../components/Backend/AdminSlider/AdminSlider';
import AdminPost from '../../components/Backend/AdminPost/AdminPost';
import AdminCategory from '../../components/Backend/AdminCategory/AdminCategory';
import AdminTopic from '../../components/Backend/AdminTopic/AdminTopic';
import AdminContact from '../../components/Backend/AdminContact/AdminContact';

//service
// import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import * as BrandService from '../../services/BrandService'
import * as SliderService from '../../services/SliderService'
import * as PostService from '../../services/PostService'
import * as MenuService from '../../services/MenuService'
import * as CategoryService from '../../services/CategoryService'
import * as TopicService from '../../services/TopicService'
import * as ContactService from '../../services/ContactService'

import CustomizedContent from './components/CustomizedContent';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import Loading from '../../components/LoadingComponent/Loading';


const AdminPage = () => {
  const user = useSelector((state) => state?.user)

  const items = [
    getItem('Quản Lí Người dùng', 'users', <UserOutlined />),
    getItem('Quản Lí Sản phẩm', 'products', <AppstoreOutlined />), 
    getItem('Quản Lí Danh Mục', 'categories', <MailOutlined  />),
   
    getItem('Quản Lí Thương Hiệu', 'brands', <StarOutlined />),  
    getItem('Quản Lí Đơn hàng', 'orders', <ShoppingCartOutlined />),
    getItem('Quản Lí Bài Viết', 'posts', <MailOutlined  />),
    getItem('Quản Lí Banner', 'banners', <MailOutlined  />),
    getItem('Quản Lí Menu', 'menus', <MailOutlined  />),
    getItem('Quản Lí Chủ Đề', 'topics', <MailOutlined  />),
    getItem('Quản Lí Liên Hệ', 'contacts', <MailOutlined  />),
  
  ];


  const [keySelected, setKeySelected] = useState('');
  // const getAllOrder = async () => {
  //   const res = await OrderService.getAllOrder(user?.access_token)
  //   return {data: res?.data, key: 'orders'}
  // }

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res1', res)
    return {data: res?.data, key: 'products'}
  }
  const getAllPost = async () => {
    const res = await PostService.getAllPost
    console.log('res', res)
    return {data: res?.data, key: 'posts'}
  }
  const getAllMenu = async () => {
    const res = await MenuService.getAllMenu
    console.log('res', res)
    return {data: res?.data, key: 'posts'}
  }
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return {data: res?.data, key: 'users'}
  }
  const getAllBrands = async () => {
    const res = await BrandService.getAllBrand
    console.log('res', res)
    return {data: res?.data, key: 'brands'}
  }
  const getAllSlider = async () => {
    const res = await SliderService.getAllSlider
    console.log('res', res)
    return {data: res?.data, key: 'brands'}
  }
  const getAllCategory = async () => {
    const res = await CategoryService.getAllCategory
    console.log('res', res)
    return {data: res?.data, key: 'categories'}
  }

  const getAllTopic = async () => {
    const res = await TopicService.getAllTopic
    console.log('res', res)
    return {data: res?.data, key: 'topics'}
  }

  const getAllContact = async () => {
    const res = await ContactService.getAllContact
    console.log('res', res)
    return {data: res?.data, key: 'contacts'}
  }



  const queries = useQueries({
    queries: [
      {queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60},
      {queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60},
      {queryKey: ['brands'], queryFn: getAllBrands, staleTime: 1000 * 60},
      {queryKey: ['sliders'], queryFn: getAllSlider, staleTime: 1000 * 60},
      {queryKey: ['posts'], queryFn: getAllPost, staleTime: 1000 * 60}, 
      // {queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60},
      {queryKey: ['menus'], queryFn: getAllMenu, staleTime: 1000 * 60},
      {queryKey: ['categories'], queryFn: getAllCategory, staleTime: 1000 * 60},
      {queryKey: ['topics'], queryFn: getAllTopic, staleTime: 1000 * 60},
      {queryKey: ['contacts'], queryFn: getAllContact, staleTime: 1000 * 60},
    ]
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if(queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
    return result
    } catch (error) {
      return result
    }
  },[queries])
  // const COLORS = {
  //  users: ['#e66465', '#9198e5'],
  //  products: ['#a8c0ff', '#3f2b96'],
  // //  orders: ['#11998e', '#38ef7d'],
  // };

  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )
        // case 'orders':
        //   return (
        //     <OrderAdmin />
        //   )
        case 'brands':
          return (
            <AdminBrand />
          )
          case 'posts':
            return (
              <AdminPost/>
            ) 
            case 'banners':
              return (
                <AdminSlider/>
              )   
               case 'menus':
              return (
                <AdminMenu/>
              )
              case 'categories':
                return (
                  <AdminCategory/>
                )
                case 'topics':
                  return (
                    <AdminTopic/>
                  )
                  case 'contacts':
                    return (
                      <AdminContact/>
                    )
      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  console.log('memoCount', memoCount)
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex',overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          {/* <Loading isLoading={memoCount && Object.keys(memoCount) &&  Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </Loading> */}
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage