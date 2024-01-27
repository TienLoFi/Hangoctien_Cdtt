import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContactComponent from '../../components/ContactComponent/ContactComponent'
import Map from '../../components/Map/Map'

const ProductDetailsPage = () => {  
  const key = 'AIzaSyAp1wiXcD3heI7Yue8qaFa63phqiHOV-UI'
  const navigate = useNavigate()
  return (
    <div style={{width: '100%', height: '100%',backgroundColor:'#FFFFFF'}}>
      <div div style={{ width: '100%', height: '40px', margin:  '10px',background: '#F2F2F2' ,display: 'flex',alignItems: 'Left' }}>
        <h5><span style={{cursor: 'pointer', fontWeight: 'bold',fontSize:16}} onClick={() => {navigate('/')}}>Trang chủ</span> - Liên Hệ </h5>
      </div>
      <div style={{ marginTop: '20px' ,}}> <ContactComponent/>
    
      
     
      
      </div>
     
           
    </div>
             
  )
}

export default ProductDetailsPage

