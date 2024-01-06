import React from 'react'
import {useState} from 'react'
import {DeliveryType} from './DeliveryType'
import {DineoutType} from './DineoutType'
import './Home.css'
function Home() {

  const [state,setState]=useState('Delivery')

  const Delivery=()=> {
  document.getElementById('delv').style.borderBottomColor='blue'
  document.getElementById('dine').style.borderBottomColor='white'
  setState('Delivery');
  }

  const Dineout=()=> {
    document.getElementById('delv').style.borderBottomColor='white'
    document.getElementById('dine').style.borderBottomColor='blue'
    setState('Dineout');
  }

  return (
    <div>
    <div className='action_button'>
      <div id='delv' className='action' onClick={()=>Delivery()}>
        <div  className='delivery'></div>
          <div className='text'>Delivery</div>
        </div>
        <div id='dine' className='action' onClick={()=>Dineout()}>
        <div className='dineout'></div>
         <div className='text'>Dineout</div>
        </div>
    </div>
    
    {state=='Delivery' ?<DeliveryType/> :
    <DineoutType/>

    }
    </div>
  )
}

export default Home