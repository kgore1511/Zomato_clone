import React from 'react';
import {useSelector} from 'react-redux'
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import {addToCart, removeFromCart, decrementFromCart} from '../store/restaurantSlice'
import {useDispatch} from 'react-redux'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Menu.css'
var flag=true
const Menu = () => {
  const url=window.location.href.split('/')
  const restaurant_id=url[url.length-1]
  console.log(restaurant_id)
  const dispatch=useDispatch()
 const {restaurantMenu,restaurantDetailisLoading,restaurantDetailisError}=useSelector(state=>state.restaurant)
 const loading=useSelector(state=>state.restaurant.restaurantDetailisLoading)
 const cartItems= useSelector(state=> state.restaurant.cartItem)

const Handler=(cartItem)=> {
  flag=false
  return (  
    <IconButton style={{display:'flex',justifyItems:'center'}}><button onClick={()=>decrement(cartItem)}> - </button>&nbsp;{cartItem.qty}&nbsp;<button onClick={()=>addToCartHandler(cartItem)}> + </button></IconButton>)
}

const increment=()=> {

}

const decrement=(cartItem)=> {
  if(cartItem.qty>1) dispatch(decrementFromCart(cartItem._id))
  else dispatch(removeFromCart(cartItem._id))
}


 const addToCartHandler=(item,qty)=> {
  dispatch(addToCart({...item,qty,restaurant_id}))
 }

  return (
    <div>
      <div className='menu_header'>
      <div ><h2>Order Online</h2></div>
      <div><input type='text' placeholder='Search within Menu' /></div>
      </div>
      <div className='menu_detail'>
     {loading?<div>Loading...</div>:
      restaurantMenu.map(item=> {
         flag=true
       return (<ul key={item._id} className='menu_container'>
        <li><img className='dish_image' src={item.image} /></li>
        <div><li className='dish_name'>{item.item_name}</li>
        <li className='dish_price'>&#8377;{item.price}</li></div>
     
      {cartItems.map(cartItem => cartItem._id == item._id  && Handler(cartItem) )}
      
       {flag && <IconButton color="primary" onClick={()=>addToCartHandler(item,1)} aria-label="add to shopping cart">
      <AddShoppingCartIcon />
      </IconButton>}
      </ul>)}
      )}
    
    </div>
    </div>
  )
}

export default Menu