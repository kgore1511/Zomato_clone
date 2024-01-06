import React from 'react'
import axios from 'axios'
import { useState } from 'react';
export function DineoutType() {

const [url,setUrl]=useState("")

  const handleSubmit=(e)=> {
    const formData=new FormData()
    formData.append('myFile',e.target.files[0])
console.log(formData)
    /*axios.post('/image',formData).then(res=> {
      console.log(res)
      setUrl(res.data.url)
    })*/

  }

  return (
    <div>
      <input type='file' onChange={(e)=>handleSubmit(e)}/>
      <img src="http://res.cloudinary.com/dfi7indvf/raw/upload/v1699518769/restaurant_images/m8cl8l8urvjeep6hg61a"/>
    </div>
  )
}
