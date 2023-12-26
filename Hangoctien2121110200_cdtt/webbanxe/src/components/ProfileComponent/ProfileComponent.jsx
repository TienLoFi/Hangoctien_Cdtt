    import React from 'react'
    import { useNavigate, useParams } from 'react-router-dom'
    import { LeftOutlined } from '@ant-design/icons';
 
    const ProfileComponent = () => {
    
    const navigate = useNavigate()
    return (
        <div style={{width: '100%',background: 'rgba(255, 255, 255, 0.5)'}}>
        <div style={{ width: '1270px',  height:50,  padding:10,margin: '3 auto'}} >
            <h5 style={{cursor: 'pointer', fontWeight: 'bold',fontSize:16,display: 'flex', alignItems: 'center'}} >Trang Chủ <span style={{cursor: 'pointer', fontWeight: 'bold',fontSize:12}} onClick={() => {navigate('/')}}><LeftOutlined />Quay Lại</span>   </h5>

        </div>
        </div>
    )
    }

    export default ProfileComponent