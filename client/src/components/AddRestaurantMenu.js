import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { addMenu } from '../store/restaurantSlice'
const AddRestaurantMenu = () => {
  const dispatch=useDispatch()
  const [name,setName]=useState("")
  const [price,setPrice]=useState(0.00)
  const [image,setImage]=useState()

  const imageSubmit=(e)=> {
    const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        setImage(reader.result)
        reader.onload = () => {
        setImage(reader.result)
  }
}

const submitHandler=()=> {
  const restaurant_id='654fe3c4dc661de942829ea0'
  dispatch(addMenu({restaurant_id,name,price,image}))
  }
  
  return (
    <div>
      <h1>Add Menu</h1>
      <label>Name</label>
      <input type='text' onChange={(e)=>setName(e.target.value)} />
      <label>Price</label>
      <input type='text' onChange={(e)=>setPrice(e.target.value)}/>
      <label>Image</label>
      <input type='file' onChange={(e)=>imageSubmit(e)}/>
      <button onClick={()=>submitHandler()}>Submit</button>
    </div>
  )
}

export default AddRestaurantMenu