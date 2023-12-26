import { Badge, Button, Col, Popover } from 'antd'
import React from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { useEffect } from 'react';
import { searchProduct } from '../../redux/slides/productSlide';
import logo from '../../assets/images/Logo/expresslogo.png';
import { SearchOutlined } from '@ant-design/icons'
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search,setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)

  const handleViewOrder = () => {
    if (!user?.id) {
        navigate('/sign-in', { state: location?.pathname })
    } else {
        navigate('/order')
    }
}
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleNavigateRegister = () => {
    navigate('/sign-up')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (

        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order?id=${user.id}&token=${user.token}`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order') {
      navigate('/my-order',{ state : {
          id: user?.id,
          token : user?.access_token
        }
      })
    }else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div style={{  heiht: '100%', width: '100%', display: 'flex',background: '#FFBA00', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <WrapperTextHeader to='/' style={{ display: 'flex', alignItems: 'center' }}>     <img src={logo} alt="avatar" style={{
                  height: '100%',
                  width: '100%',  
                  maxHeight: '60px',
                  objectFit: 'contain'
                }} /></WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButttonInputSearch
              
              size="large"
              bordered={true}
              textbutton="Tìm kiếm"
              
              placeholder="Bạn Muốn Tìm Gì?"
              onChange={onSearch}
              backgroundColorButton="#5a20c1"
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '40px',
                  width: '40px',  
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.name}</div>
                  </Popover>
                </>
              ) : (
                <div>
                      <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập </WrapperTextHeaderSmall>
                </div>
                <div onClick={handleNavigateRegister} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall >Đăng Kí</WrapperTextHeaderSmall>
                  </div>
                </div>
            
               
            
              )}
            </WrapperHeaderAccout>
          </Loading>
          {!isHiddenCart && (
            <div onClick={handleViewOrder} style={{ cursor: 'pointer' }}>
          <Badge count={order?.orderItems?.length} size="small">
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <ShoppingOutlined  style={{ fontSize: '30px', color: '#20409A' }} />
    <WrapperTextHeaderSmall style={{ marginTop: '4px' }}>Giỏ hàng</WrapperTextHeaderSmall>
  </div>
</Badge>

            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent