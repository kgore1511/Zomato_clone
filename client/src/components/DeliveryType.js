import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import dish1 from '../img/dish1.jpg'
import { getDeliveryRestaurants } from '../store/restaurantSlice'
import './DeliveryType.css'
import { hover } from '@testing-library/user-event/dist/hover'
export function DeliveryType() {
  const dispatch=useDispatch()
  const category=1;
 const {deliveryRestaurantisLoading,deliveryRestaurantisError,deliveryRestaurantData} = useSelector(state=> state.restaurant)
  useEffect(()=> {
    dispatch(getDeliveryRestaurants(category))
  }, [])
  const navigate=useNavigate();
  return (
    <div>
      { deliveryRestaurantisLoading ? <div>Loading...</div>:
      deliveryRestaurantisError? <div>Something went wrong try adaing later</div>:
      deliveryRestaurantData.length==0?<div>No results found</div>:
        <div>
          
           <div className='heading'> Delivery Restaurant's in Ujjain </div>
           <div className='container-order'>
           {deliveryRestaurantData.map(item =>
          <div>
          
           <div className='card' onClick={()=>navigate('/restaurant/'+item._id)} >
            <img className='dishImage' src={item.image} />
            <div className='details'>
            <div className='restaurant_name'>{item.name}</div>
            <div className='rating'>3.5 <i class="fa fa-star fa_custom"></i></div>
            </div>
            </div></div>
            )}
           </div>
           </div>
}

    </div>
  )
}
