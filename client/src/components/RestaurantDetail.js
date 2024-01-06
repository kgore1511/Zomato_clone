import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect } from 'react';
import Menu from './Menu';
import Overview from './Overview';
import Reviews from './Reviews';
import './restaurantDetail.css'
import { getRestaurantDetail } from '../store/restaurantSlice';
const RestaurantDetail = () => {
  const [tab,setTab]=useState("menu")
  const dispatch=useDispatch()
  let url=(window.location.href).split('/');
  const productId=url[url.length -1]
  useEffect(()=> {
    dispatch(getRestaurantDetail(productId))
  }, [])


  const {restaurantDetailisLoading,restaurantDetailisError,restaurantDetailData}= useSelector(state=> state.restaurant)
  const restaurant=restaurantDetailData

  const overview=()=> {
    setTab("overview")
    document.getElementById('overview').style.borderBottomColor='green'
    //document.getElementById('dine').style.borderBottomColor='blue'
  }

  const menu=()=> {
    setTab("menu")
  }

  const reviews=()=> {
    setTab("reviews")
  }
  return (
    <div>
      {restaurantDetailisLoading ? <div>Loading...</div> :
      restaurantDetailisError ? <div>Some Error Occur try after sometime</div> :
      <div>
      <div><img className='detailImage' src={restaurant.image} /></div>
       <div className='container_detail'>
       <div>
      <div><h1 className='name'>{restaurant.name}</h1></div>
      <div ><h2 className='address'>{restaurant.address}</h2></div>
      </div>
      <div>
        Ratings :
      </div>
      </div>
      <div className='container_menu'>
        <div id='overview' className='overview' onClick={()=>overview()}>Overview</div>
        <div id='menu' className='order_online' onClick={()=>menu()}>Order Online</div>
        <div id='reviews' className='reviews' onClick={()=>reviews()}>Reviews</div>

      </div>
      
    {tab=='overview' && <div><Overview/></div>}
     
    {tab=='menu' && <div><Menu/></div>}

    {tab=='reviews' && <div><Reviews/></div>}
     </div>

}
    </div>
  )
}

export default RestaurantDetail