import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import './Restaurant.css'
import { addMenu, addRestaurant } from '../store/restaurantSlice';
export function Restaurant() {

  const [name,setName]=useState("");
  const [address,setAddress]=useState("");
  const [city,setCity]=useState("");
  const [image,setImage]=useState("")
  const [mobile,setMobile]=useState("");
  const [restaurantType,setRestaurantType]=useState(")")
  const dispatch=useDispatch()
  
  const imageSubmit=(e)=> {
    const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        setImage(reader.result)
        reader.onload = () => {
        setImage(reader.result)
  }
}

  const handleSubmit=()=> {
  
    dispatch(addRestaurant({name,address,mobile,city,image,restaurantType}))
  }

  return (
    <div className='restauranrt'>
      <center><ul  className='container_restaurant'>
        <h1>Add Restaurant</h1>
        <li><label>Name</label> <input type='text' onChange={(e)=>setName(e.target.value)} /></li>
        <li><label>Mobile Number</label> <input type='text' onChange={(e)=>setMobile(e.target.value)}/></li>
        <li><label>City</label><select id="cars" name="cars" onChange={(e)=>setCity(e.target.value)}>
        <option value="Ujjain">Ujjain</option>
          <option value="Indore">Indore</option>
          <option value="Dewas">Dewas</option>
          <option value="Mumbai">Mumbai</option>
</select></li>

<li><label>Restaurant Type</label><select  onChange={(e)=>setRestaurantType(e.target.value)}>
        <option value="Delivery">Delivery</option>
          <option value="Dineout">Dineout</option>
        
</select></li>


<li><label>Address</label> <textarea onChange={(e)=>setAddress(e.target.value)}/></li>

<li><label>Image</label><input type='file' onChange={(e)=>imageSubmit(e)}/></li>

<li><button onClick={(e)=>handleSubmit(e)}>Submit</button></li>

        </ul></center>


    </div>
  )
}
